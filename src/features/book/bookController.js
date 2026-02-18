import { asyncHandler, sendResponse } from "../../utils/helperFunctions.js";
import Book from "./bookModel.js"

export const createBook = asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    sendResponse(res, {status: 201, message: "Book created successfully", data: book});
});

export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return sendResponse(res, {status: 404, success: false, message: "Book not found"});
    sendResponse(res, {message: "Book fetched successfully", data: book});
});

export const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return sendResponse(res, {status:404, success: false, message: "Book not found"});
    sendResponse(res, {message: "Book deleted successfully"});
});

export const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if(!book) return sendResponse(res, {status: 404, success: false, message: "Book not found"});
    sendResponse(res, {message: "Book updated successfully", data: book});
})

export const getBooks = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, sort = "-createdAt", fields, ...filters } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    let query = Book.find(filters);
    query = query.sort(sort).skip(skip).limit(limit);
    if (fields) query = query.select(fields.replace(",", " "));
    const [books, total] = await Promise.all([query, Book.countDocuments(filters),]);
    const pages = Math.ceil(total / limit);
    sendResponse(res, {
        message: "Books fetched successfully",
        data: books,
        meta: { total, page, pages, limit },
    });
});