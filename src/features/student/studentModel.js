import { Schema, model } from "mongoose";

const studentSchema = new Schema(
    {
        name: { type: String, trim: true, required: true, },
        age: { type: Number, required: true, min: 18, max: 30 },
        surname: { type: String, trim: true },
        isMarried: Boolean,
        address: Object,
        hobbies: Array
    },
);


const Student = model("Student", studentSchema);

export default Student;

// {
//     timestamps: true, // automatically adds createdAt and updatedAt
//     versionKey: false, // removes __v field
// }
