import express from 'express';
import { createPages, getPagesbyBook} from '../controllers/Page.js';
import Auth from "../middleware/Auth.js";
import { check, param } from 'express-validator'
import CheckValidations, { isMongoID } from '../middleware/CheckValidations.js';

const router = express.Router();

router.get('/:bookId', param('bookId').custom(isMongoID), CheckValidations, Auth, getPagesbyBook);

router.post(
    '/:bookId', param('bookId').custom(isMongoID), [
    check('contentBlocks').not().isEmpty().withMessage('Content absent'),
], CheckValidations, Auth, createPages);

export default router