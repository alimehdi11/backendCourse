import jwt from "jsonwebtoken";
import User from "../features/users/userModel.js"; // Mongoose User model
import { asyncHandler } from "../utils/helperFunctions.js";
import { config } from "../config/config.js";


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    // 1️⃣ Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, config.JWT_SECRET);

            // Attach user to request
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default authMiddleware;
