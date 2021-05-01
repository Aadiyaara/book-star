import express from 'express';

import Page from '../models/Page.js';
import Book from '../models/Book.js';

const router = express.Router();

export const getPagesbyBook = async (req, res) => { 
    try {
        // PAGINATION
        console.log(req.query.skip, req.query.limit);
        const bookId = req.params.bookId
        const books = await Page.find({book: bookId}).sort({number: 1}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
        return res.status(200).json(books);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: error.message });
    }
}


export const createPages = async (req, res) => {
    const { bookId } = req.params;
    const { contentBlocks } = req.body;

    console.log(bookId);
    const book = await Book.findById(bookId)
    if(!book)
        return res.status(404).json({'error': 'Book not found'})

    if(book.author.toString() !== req.userId.toString())
        return res.status(403).json({'error': 'Unauthorized! The book for this page does not belong to the current user.'})
    
    try {
        for(let block of contentBlocks) {
            const newPage = new Page({ content: block.content, book: bookId, number: block.number, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
            await newPage.save();
        }
        return res.status(200);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

export const createPage = async (req, res) => {
    const { bookId } = req.params;
    const { content } = req.body;

    const book = await Book.findById(bookId)
    if(!book)
        return res.status(404).json({'error': 'Book not found'})

    if(book.author.toString() !== req.userId.toString())
        return res.status(403).json({'error': 'Unauthorized! The book for this page does not belong to the current user.'})

    const pages = await Page.find({book: bookId})

    const number  = pages.length + 1

    const newPage = new Page({ content, book: bookId, number, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })

    try {
        await newPage.save();
        res.status(200).json(newPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePage = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const page = await Page.findById(id)
    if(!page)
        return res.status(404).json({'error': 'Page not found'})

    const book = await Book.findById(page.book)
    
    if(book.author.toString() !== req.userId.toString())
        return res.status(403).json({'error': 'Unauthorized! The book for this page does not belong to the current user.'})
    

    const updatedPage = { content, updatedAt: new Date().toISOString() };

    await Page.findByIdAndUpdate(id, updatedPage, { new: true });

    return res.status(200).json(updatedPage);
}

export const deletePage = async (req, res) => {
    const { id } = req.params;
    
    const page = await Page.findById(id)
    if(!page)
        return res.status(404).json({'error': 'Page not found'})
    
    const book = await Book.findById(page.book)
    
    if(!book)
        return res.status(404).json({'error': 'Book not found'})
    
    if(book.author.toString() !== req.userId.toString())
        return res.status(403).json({'error': 'Unauthorized! You are not the owner of this book'})
    
    await Book.findByIdAndRemove(id);

    res.status(200).json({ message: "Book deleted successfully." });
}


export default router;