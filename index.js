import express from "express";
import studentRouter from "./src/features/student/studentRouter.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import bookRouter from "./src/features/book/bookRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = config.PORT;

/* ==============================
   APIS
============================== */

app.use("/api/students", studentRouter);
app.use("/api/books", bookRouter);



/* ==============================
   Server
============================== */

app.listen(PORT, () => {
   console.log(`🚀 Server running on this path http://localhost:${PORT}/`);
});

/* ==============================
   Connet to Db
============================== */

connectDB();

// Global error handler

app.use(errorHandler);



