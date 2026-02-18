import express from "express";
import { createBook, deleteBook, getBooks, getBookById, updateBook } from "./bookController.js";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/", createBook);
bookRouter.get("/:id", getBookById);
bookRouter.delete("/:id", deleteBook);
bookRouter.put("/:id", updateBook);

export default bookRouter;
