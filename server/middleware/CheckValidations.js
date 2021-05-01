import { validationResult } from 'express-validator'
import mongoose from "mongoose";

const CheckValidations = async (req, res, next) => {
    try {
        const { errors } = validationResult(req)
        if(errors.length){
            const err = {}
            errors.forEach(element => {
                if(!err[element.param])  
                    err[element.param] = [element.msg]
                else err[element.param].push(element.msg)
            });
            return res.status(400).json({'errors': err})
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

export default CheckValidations;


export const isMongoID = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}