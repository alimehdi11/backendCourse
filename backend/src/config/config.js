import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

const envPath = path.resolve(process.cwd(),NODE_ENV === "production"? "src/config/env.production": "src/config/env.development");

dotenv.config({ path: envPath });

const _config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
