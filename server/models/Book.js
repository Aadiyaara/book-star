import mongoose from 'mongoose';
import Page from './Page.js';

const bookSchema = mongoose.Schema({
    id: { type: String },
    title: {
        type: String,
        required: true,
        trim: true
    },
    caption: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cover: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
})

bookSchema.virtual('pages', {
    ref: 'Page',
    localField: '_id',
    foreignField: 'book'
})

bookSchema.pre('remove', async function (next) {
    const book = this
    await Page.remove({book: book._id})
    next()
})

export default mongoose.model('Book', bookSchema);
