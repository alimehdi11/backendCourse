import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    try {

        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully");
        });
        // handle run time connection error

        mongoose.connection.on("error", (err) => {
            console.log("Error in connecting to database.", err);
        });

        await mongoose.connect(config.DB_URL);

    } catch (error) {
        // handle initial connection error
        console.error("Failed to connect to database.", error);
        process.exit(1);
    }
}

export default connectDB;


