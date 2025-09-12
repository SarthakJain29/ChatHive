import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//middleware to protect routes
export const protectRoute = async (req, res, next) =>{
    try {
        // const token = req.headers.token;
        // if (!token) {
        //     return res.status(401).json({ success: false, message: "No token provided" });
        // }
        const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ success: false, message: "No token provided" });
            }

        const token = authHeader.split(" ")[1]; // extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //decoding the token

        const user = await User.findById(decoded.userId).select("-password");  //removing password from userdata

        if(!user) return res.json({success : false, message: "user not found"});

        req.user = user; //adding userdata to request
        next();  //execute next function
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message: error.message}); 
    }
}