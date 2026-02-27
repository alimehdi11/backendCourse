import createError from "http-errors";
import { asyncHandler, sendResponse } from "../../utils/helperFunctions.js";
import User from "./userModel.js";

// ================= SignUp USER =================
export const signUp = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);

    // Generate JWT token
    const token = user.generateJWT();

    sendResponse(res, {
        status: 201,
        message: "User created successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
    });
});

// ================= LOGIN USER =================
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createError(401, "Invalid credentials"));

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(createError(401, "Invalid credentials"));

    // Generate JWT token
    const token = user.generateJWT();

    sendResponse(res, {
        message: "Login successful",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        }
    });
});
