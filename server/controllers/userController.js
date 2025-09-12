import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

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
        
        res.json({
             success: true,
             userData: {...newUser._doc, password: undefined}, 
             token, 
             message: "Account created successfully"
        }); //returning success if user created

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
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successfull"}); 

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

//to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const {profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true})
            //new: true will return new user data
        } else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName, profilePic: upload.secure_url}, {new: true}) 
            //uploading profile pic to cloud, then updating data by getting its url
        }
        res.json({success: true, user: updatedUser});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}