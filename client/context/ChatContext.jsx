import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

//for storing chat data, sidebar chats, messages
export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const [messages, setMessages] = useState([]); //messages for selected user
    const [users, setUsers] = useState([]); //list of users for left sidebar
    const [selectedUser, setSelectedUser] = useState(null); //id of user with whom we want to chat
    const [unseenMessages, setUnseenMessages] = useState({}); //userId : no of unseen msg

    const {socket, axios} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async () => {
        try {
            const {data} = await axios.get("/api/messages/users"); //getting users from api
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, {
                ...messageData,
                receiverId: selectedUser._id,
            });
            if(data.success){
                setMessages((prevMessages)=> [...prevMessages, data.newMessage])
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }   

    //function to subscribe to messages for selected user (for getting replies instantly)
    const subscribeToMessages = () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) =>({
                    ...prevUnseenMessages, [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }));
            }
        })
    }

    //function to unsubsribe from messages
    const unsubscribeFromMessages = ()=>{
        if(socket) socket.off("newMessage")
    }

    useEffect(() => {
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();
    },[socket, selectedUser]);

    const value = {
        messages, 
        users, 
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
    }

    return (
        <ChatContext.Provider value = {value}>
            {children}
        </ChatContext.Provider>
    )
}