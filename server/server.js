import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";

//creating express app and http server
const app = express();
const server = http.createServer(app);

//middlware
app.use(express.json({limit: "4mb"})); //for json parsing
app.use(cors()) //for cross origin

//Routes setup
app.use("/api/status", (req,res) => {
    res.send("Server is live");
})
app.use("/api/auth", userRouter);

//connect to mongodb
await connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log("server running on PORT:" + PORT));