import { generateToken } from "../lib/utils";
import User from "../models/User";
import bcrypt from "bcryptjs";

//Signup new user
export const signup = async (req, res) => {
    const {fullName, email, password, bio} = req.body;

    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message:"Missing Details"})
        }
        //checking for existing user
        const user = await User.findOne({email});
        if(user){
            return res.json({success: false, message:"Account already exists"})
        }

        //encrypting the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        }); //creating new user

        //jwt token for authentication
        const token = generateToken(newUser._id);
        
        res.json({success: true, userData: newUser, token, message: "Account created successfully"}); //returning success if user created

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


//Login user
export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return res.json({success: false, message: "Missing Values"});
        }

        const userData = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.
        compare(password, userData.password);
        
        if(!isPasswordCorrect){
            res.json({success: false, message: "Invalid credentials"});
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successfull"}); 

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}