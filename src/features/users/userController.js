import { asyncHandler, sendResponse } from "../../utils/helperFunctions.js";
import User from "./userModel.js";


// ================= GET USER BY ID =================
export const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if (!user)
        return sendResponse(res, {
            status: 404,
            success: false,
            message: "User not found"
        });

    sendResponse(res, {
        message: "User fetched successfully",
        data: user
    });
});


// ================= DELETE USER =================
export const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
        return sendResponse(res, {
            status: 404,
            success: false,
            message: "User not found"
        });

    sendResponse(res, {
        message: "User deleted successfully"
    });
});


// ================= UPDATE USER =================
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
        return sendResponse(res, {
            status: 404,
            success: false,
            message: "User not found"
        });

    Object.assign(user, req.body);

    await user.save();

    sendResponse(res, {
        message: "User updated successfully",
        data: user
    });
});


// ================= GET ALL USERS =================
export const getUsers = asyncHandler(async (req, res) => {

    let { page = 1, limit = 10, sort = "-createdAt", fields, name, email, ...filters } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    if (name) {
        filters.name = { $regex: name, $options: "i" };
    }

    if (email) {
        filters.email = { $regex: email, $options: "i" };
    }

    let query = User.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    if (fields) {
        query = query.select(fields.split(",").join(" "));
    }

    const [users, total] = await Promise.all([
        query,
        User.countDocuments(filters)
    ]);

    const pages = Math.ceil(total / limit);

    sendResponse(res, {
        message: "Users fetched successfully",
        data: users,
        meta: { total, page, pages, limit }
    });
});





// ================= SignUp USER =================
export const signUp = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    sendResponse(res, {
        status: 201, message: "User created successfully", data: user
    });
});



// ================= LOGIN USER =================
export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
        return sendResponse(res, {
            status: 400,
            success: false,
            message: "Invalid credentials"
        });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return sendResponse(res, {
            status: 400,
            success: false,
            message: "Invalid credentials"
        });

    sendResponse(res, {
        message: "Login successful",
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});
