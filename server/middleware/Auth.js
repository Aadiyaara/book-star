import jwt from "jsonwebtoken";

const secret = 'the_great_bookworm';

const Auth = async (req, res, next) => {
    try {
        if(!req.headers.authorization) 
            return res.status(403).json({'error': 'Unauthorized'})
        
        const token = req.headers.authorization.split(" ")[1];

        if(!token) 
            return res.status(403).json({'error': 'Unauthorized'})

        let decodedData;

        if (token) {
            try {
                decodedData = jwt.verify(token, secret);
            }
            catch (err) {
                return res.status(403).json({'error': 'Unauthorized'})
            }
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error);
    }
};

export default Auth;