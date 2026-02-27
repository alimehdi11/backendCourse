import express from "express";
import studentRouter from "./src/features/student/studentRouter.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";
import bookRouter from "./src/features/book/bookRouter.js";
import cors from "cors";
<<<<<<< HEAD:backend/index.js
import userRouter from "./src/features/users/userRouter.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.FRONTEND_ORIGIN }));
=======
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: config.FRONTEND_ORIGIN}));
>>>>>>> cb58e8f4022f2acab5a132faf8efb26164da8088:index.js
const PORT = config.PORT;

/* ==============================
   APIS
============================== */

app.use("/api/students", studentRouter);
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter)


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
