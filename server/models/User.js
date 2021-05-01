import mongoose from "mongoose";
import Book from "./Book.js";

const userSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required:  true, trim: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, trime: true, unique: true },
    password: { type: String, required: true },
});

userSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author'
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Book.remove({author: user._id})
    next()
})

export default mongoose.model("User", userSchema);
