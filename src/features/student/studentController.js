import Student from "./studentModel.js";

// CREATE
const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create student",
            error: error.message
        });
    }
};

// GET ALL - Basic Filtering Only
const getStudents = async (req, res) => {
    try {

        // 2️⃣ Query database
        const students = await Student.find(req.query);

        // 3️⃣ Send response
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: error.message
        });
    }
};



// GET BY ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid ID",
            error: error.message
        });
    }
};

// DELETE
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid ID",
            error: error.message
        });
    }
};

// FULL UPDATE (PUT)
const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true,overwrite: true});

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update student",
            error: error.message
        });
    }
};

// PARTIAL UPDATE (PATCH)
const partialUpdateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id,{ $set: req.body },{ new: true, runValidators: true });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student partially updated",
            data: student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to partially update",
            error: error.message
        });
    }
};

export {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    partialUpdateStudent,
    deleteStudent
};
