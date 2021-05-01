import express from "express";
import { signin, signup } from "../controllers/User.js";
import { check, body } from 'express-validator'
import CheckValidations from "../middleware/CheckValidations.js";

const router = express.Router();

router.post("/signin", 
    body('method').trim(), 
    body('password').trim(), [
    check('method').not().isEmpty().withMessage('Method absent'),
    check('password').not().isEmpty().withMessage('Password absent'),
], CheckValidations, signin);

router.post("/signup", 
    body('email').trim(),
    body('name').trim(), 
    body('password').trim(), [
    check('email').not().isEmpty().withMessage('Email absent'),
    check('name').not().isEmpty().withMessage('Name absent'),
    check('password').not().isEmpty().withMessage('Password absent'),
], CheckValidations, signup);

export default router;