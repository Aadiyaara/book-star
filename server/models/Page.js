import mongoose from 'mongoose';

const pageSchema = mongoose.Schema({
    id: { type: String },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('Page', pageSchema);
