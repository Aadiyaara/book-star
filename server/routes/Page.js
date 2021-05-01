import express from 'express';
import { createPage, updatePage, deletePage, getPagesbyBook } from '../controllers/Page.js';
import Auth from "../middleware/Auth.js";
import { check, body, param } from 'express-validator'
import CheckValidations, { isMongoID } from '../middleware/CheckValidations.js';

const router = express.Router();

router.post(
    '/:bookId',
    param('bookId').not().isEmpty(), 
    body('content').trim(), [
    check('content').not().isEmpty().withMessage('Content absent'),
], CheckValidations, Auth, createPage);

router.patch(
    '/:id', 
    body('content').trim(), [
        check('content').not().isEmpty()
    ] ,
    CheckValidations, Auth, updatePage);

router.delete('/:id', Auth, deletePage);

export default router;