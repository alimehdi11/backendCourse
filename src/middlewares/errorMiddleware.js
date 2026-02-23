import { config } from "../config/config.js";

export const errorHandler = (err, _req, res, _next) => {

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        const fields = Object.keys(err.keyValue).join(", ");
        message = `Duplicate field value: ${fields}`;
    }

    // Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(val => val.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(config.NODE_ENV === "development" && { stack: err.stack })
    });
};

// 🔹 JWT Errors (optional but recommended)
// if (err.name === "JsonWebTokenError") {
//     statusCode = 401;
//     message = "Invalid token";
// }


// if (err.name === "TokenExpiredError") {
//     statusCode = 401;
//     message = "Token expired";
// }
