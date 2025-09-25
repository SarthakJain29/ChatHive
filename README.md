# QuickChat  
**Real-time Chat App** | React.js, Express.js, MongoDB, Socket.IO  

QuickChat is a modern real-time chat application built with **React.js** for the frontend, **Express.js** for the backend, **MongoDB** for persistence, and **Socket.IO** for instant messaging with low latency (<100ms). The app features secure authentication, persistent chat history, and interactive user features for a production-ready chat experience.  

---

## Features
- Real-time chat with Socket.IO (latency <100ms)  
- JWT-based authentication for secure messaging  
- Persistent chat history stored in MongoDB  
- User profile management & edit functionality  
- Media sharing (images, files, etc.)  
- Responsive UI for desktop & mobile  

---

## Demo Login Credentials
You can try out QuickChat with the following demo account:  

| Email                  | Password     |
|------------------------|--------------|
| test@mail.com          | test123    |

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <project-repo-link>
cd quickchat
```

### 2. Install Dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a .env file in the backend folder:
```bash
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the App
```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

#### The app should be available at: http://localhost:3000

## Usage

- Login using demo credentials or register your own account.
- Join existing chat rooms or create new ones.
- Send messages, share media, and interact in real time.

## Tech Stack

- Frontend: React.js, CSS Modules
- Backend: Express.js, Node.js
- Database: MongoDB
- Realtime: Socket.IO
- Authentication: JWT

## Future Improvements

- Typing indicators
- Message read receipts
- Push notifications
- Video/audio calling support
