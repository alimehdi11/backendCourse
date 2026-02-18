import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

// cwd = current working directory (project root usually)
const envPath = path.resolve(process.cwd(),NODE_ENV === "production"? "src/config/env.production": "src/config/env.development");

dotenv.config({ path: envPath });

const _config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV,
};

export const config = Object.freeze(_config);
