import express from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book.js';

const router = express.Router();

export const getBooks = async (req, res) => { 
    try {
        const books = await Book.find().sort({[req.query.sortBy]: req.query.inOrder === 'ASC' ? 1 : -1});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getUserBooks = async (req, res) => { 
    try {
        const userId = req.userId;

        const books = await Book.find({author: userId});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getBook = async (req, res) => { 
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if(!book)
            return res.status(404).json({'error': 'No book found'})
        return res.status(200).json(book);
    } catch (error) {
        console.error('::BookRooutes -> getBook::', typeof id ,error);
        return res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    const { title, caption, image } = req.body;

    let newBook

    if(image) {
        newBook = new Book({ title, caption, image, author: req.userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }
    else newBook = new Book({ title, caption, author: req.userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    try {
        await newBook.save();
        return res.status(200).json(newBook);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, caption, image } = req.body;

    const book = await Book.findById(id)

    if(!book)
        return res.status(404).json({'error': 'Book not found'})


    if(book.author.toString() !== req.userId.toString())
        return res.status(403).json({'error': 'Unauthorized'})
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    let updatedBook = { title, caption, updatedAt: new Date().toISOString() };

    if(image) {
        updatedBook.image = image
    }


    await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    return res.status(200).json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    await Book.findByIdAndRemove(id);

    return res.status(200).json({ message: "Book deleted successfully." });
}


export default router;