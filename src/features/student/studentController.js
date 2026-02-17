import { asyncHandler, sendResponse } from "../../utils/helperFunctions.js";
import Student from "./studentModel.js";


export const createStudent = asyncHandler(async (req, res) => {
    const data = await Student.create(req.body);
    sendResponse(res, { status: 201, message: "Student created successfully", data });
});


// GET BY ID
export const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return sendResponse(res, { status: 404, success: false, message: "Student not found" });
    sendResponse(res, { message: "Student fetched successfully", data: student });
});

// DELETE
export const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return sendResponse(res, { status: 404, success: false, message: "Student not found" });
    sendResponse(res, { message: "Student deleted successfully" });
});

// PUT
export const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return sendResponse(res, { status: 404, success: false, message: "Student not found", });
    sendResponse(res, { message: "Student updated successfully", data: student });
});



// GET ALL (Filtering + Pagination)
// =createdAt = get first created
// -createdAt = get last created
export const getStudents = asyncHandler(async (req, res) => {
    let { page = 1, limit = 10, sort = "-createdAt", fields, ...filters } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    let query = Student.find(filters);
    query = query.sort(sort).skip(skip).limit(limit);
    if (fields) query = query.select(fields.replace(",", " "));
    const [students, total] = await Promise.all([query, Student.countDocuments(filters),]);
    const pages = Math.ceil(total / limit);
    sendResponse(res, {
        message: "Students fetched successfully",
        data: students,
        meta: { total, page, pages, limit },
    });
});
