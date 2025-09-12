import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar); //sidebar users

messageRouter.get("/:id", protectRoute, getMessages);   //messages by id

messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);   //marking messages as seen

messageRouter.post("/send/:id", protectRoute, sendMessage);  //sending messages

export default messageRouter;