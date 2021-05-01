import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validateEmail, makeUsername } from "../helpers/Util.js";

const secret = 'the_great_bookworm';

export const signin = async (req, res) => {
    const { method, password } = req.body;

    try {
        let user = await User.findOne({ email: method });

        if(!user)
            user = await User.findOne({ username: method });

        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: user, token });
    } catch (err) {
        console.error('::UserRoutes -> signin::', err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    let err = {}

    if(!validateEmail(email)) 
        err.email = 'Invalid email'
    else if (await User.findOne({email: email})) 
        err.email = 'User already exists with given email. Please Sign In.'
    
    if(!password) 
        err.password = 'Password absent'
    else if(password.toString().length < 8 || password.toString().length > 50)
        err.password = 'Password length must be between 8 and 50 characters long'
    
    if(!name) 
        err.name = 'Name absent'
    
    if(Object.keys(err).length) {
        res.status(400).json({errors: err})
        return
    }

    try {

        const hashedPassword = await bcrypt.hash(password.toString(), 12);

        let flag = true
        let username

        while (flag) {
            username = name.toString().toUpperCase() + makeUsername(4)
            const existingUsernameUser = await User.findOne({'username': username})
            if(!existingUsernameUser)
                flag = false
        }
        

        const result = await User.create({ email, password: hashedPassword, name: name.toString(), username: username });

        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};