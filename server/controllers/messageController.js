import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

//get all users except logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password") //displaying all users in leftbar except us

        //count number of unseen messages
        const unseenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false}) //getting unseen messages from message db
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length; //no of unread msgs for each user
            }

            await Promise.all(promises);
            res.json({success: true, users: filteredUsers, unseenMessages});
        })
    } catch (error) {
        console.log(error.message);
        res.json({success: true, message: error.message});
    }
}


//get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId} //for getting msgs bw 2 users
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true}); //marking messages as seen

        res.json({success:true, messages});
    } catch (error) {
        console.log(error.message);
        res.json({success: true, message: error.message});
    }
}
//to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.json({success: true});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {receiverId} = req.params.id;
        const senderId = req.user._id; 

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image); //uploading image
            imageUrl = uploadResponse.secure_url; //getting its url
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })//adding message data to db

        //emit the new message to receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
           io.to(receiverSocketId).emit("newMessage", newMessage); 
        }

        res.json({success:true, newMessage});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }   
}