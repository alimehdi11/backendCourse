import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../features/users/userModel.js";
import { asyncHandler } from "../utils/helperFunctions.js";
import { config } from "../config/config.js";

const authMiddleware = asyncHandler(async (req, _res, next) => {
    let token;

    if (!req.headers.authorization?.startsWith("Bearer")) {
        return next(createError(401, "Not authorized, no token"));
    }

    token = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(createError(401, "User not found"));
        }

        req.user = user;
        return next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(createError(401, "Token expired"));
        }

        return next(createError(401, "Invalid token"));
    }
});

export default authMiddleware;
