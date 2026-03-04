import createError from "http-errors";
import { asyncHandler, sendResponse } from "../../utils/helperFunctions.js";
import Book from "./bookModel.js"

export const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create({ ...req.body, userId: req.user._id });
  sendResponse(res, { status: 201, message: "Book created successfully", data: book });
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return next(createError(404, "Book not found"));
  sendResponse(res, { message: "Book fetched successfully", data: book });
});

export const deleteBook = asyncHandler(async (req, res, next) => {
  const { _id: userId, role } = req.user;

  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(createError(404, "Book not found"));
  }

  if (role !== "admin" && book.userId.toString() !== userId.toString()) {
    return next(createError(403, "Not authorized to delete this book"));
  }

  // 3️⃣ Delete book
  await book.deleteOne();

  sendResponse(res, {message: "Book deleted successfully"});
});

export const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!book) return next(createError(404, "Book not found"));
  sendResponse(res, { message: "Book updated successfully", data: book });
})

export const getBooks = asyncHandler(async (req, res) => {
  console.log(req.user)

  let { page = 1, limit = 10, sort = "-createdAt", fields, search, ...filters } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  // If bookName is provided, use regex for case-insensitive match
  //   if (bookName) {
  //     filters.bookName = { $regex: bookName, $options: "i" }; // 'i' makes it case-insensitive
  // }

  //   if (writer) {
  //     filters.writer = { $regex: writer, $options: "i" }; // 'i' makes it case-insensitive
  // }


  if (search) {
    filters.$or = [
      { bookName: { $regex: search, $options: "i" } },
      { writer: { $regex: search, $options: "i" } },
    ];
  }

  let query = Book.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (fields) query = query.select(fields.replace(",", " "));

  const [books, total] = await Promise.all([
    query,
    Book.countDocuments(filters),
  ]);

  const pages = Math.ceil(total / limit);

  sendResponse(res, {
    message: "Books fetched successfully",
    data: books,
    meta: { total, page, pages, limit },
  });
});
