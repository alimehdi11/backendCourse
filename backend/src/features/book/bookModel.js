import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    bookName: { type: String, trim: true, required: true , minlength: 3, maxlength: 100,unique:true},
    price: { type: Number, required: true },
    publishedYear: Number,
    writer: { type: String, trim: true, minlength: 3, maxlength: 100 },
    userId:{ type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timeStamps: true,
    versionKey: false,
  },
);

const Book = model("Book", bookSchema);

export default Book;
