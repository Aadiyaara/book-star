import express from 'express';

import { getUserBooks } from '../controllers/Books.js';
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.get('/', Auth, getUserBooks);

export default router;