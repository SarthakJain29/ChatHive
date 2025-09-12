import Message from "../models/Message.js";
import User from "../models/User.js";


//get all users except logged in user
const getUsersForSidebar = async (req, res) => {
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