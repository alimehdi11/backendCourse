import express from "express";
import studentRouter from "./src/features/student/studentRouter.js";
import connectDB from "./src/config/db.js";
import { config } from "./src/config/config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = config.port;

/* ==============================
   APIS
============================== */

app.use("/api/students",studentRouter)



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




