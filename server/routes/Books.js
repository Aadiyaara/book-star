import express from 'express';

import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/Books.js';
import Auth from "../middleware/Auth.js";
import { check, body, param } from 'express-validator'
import CheckValidations, { isMongoID } from '../middleware/CheckValidations.js';

const router = express.Router();

router.get('/', Auth, getBooks);

router.get('/:id', param('id').custom(isMongoID), CheckValidations, Auth, getBook);

router.post(
    '/', 
    body('title').trim(),
    body('caption').trim(), [
    check('title').not().isEmpty().withMessage('Title absent'),
    check('caption').not().isEmpty().withMessage('Caption absent'),
], CheckValidations, Auth, createBook);

router.patch(
    '/:id', 
    body('title').trim(),
    body('caption').trim(), 
    CheckValidations, Auth, updateBook);

router.delete('/:id', Auth, deleteBook);

export default router;