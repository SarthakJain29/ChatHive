import express from 'express';
import { checkAuth, login, signup, updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/signup", signup);  //signup path

userRouter.post("/login", login);  //login path

userRouter.put("/update-profile", protectRoute, updateProfile); // to update user profile

userRouter.get("/check", protectRoute, checkAuth); //to check user authentication

export default userRouter;