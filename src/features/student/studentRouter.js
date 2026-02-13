import express from "express";
import { createStudent, deleteStudent, getStudentById, getStudents, partialUpdateStudent, updateStudent } from "./studentController.js";

const studentRouter = express.Router();

studentRouter.post("/", createStudent);
studentRouter.get("/", getStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.delete("/:id", deleteStudent);
studentRouter.put("/:id", updateStudent);
studentRouter.patch("/partial/:id", partialUpdateStudent);

export default studentRouter;
