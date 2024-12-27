import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

import * as userService from "./service/user.service";
const dotenv = require("dotenv");
dotenv.config();
import auth from "./auth.middleware";
import { verifyToken } from "./helper";
const port = process.env.PORT || 3000;
const frontendURL = process.env.FE_URL || "http://localhost:3000";

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/collaboration";

const app = express();

//Init sockate
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendURL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: frontendURL }));
app.use(express.json());

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.use((req, res, next) => {
  console.log(`Request ${req.method} and api ${req.url}`);
  next();
});
app.post("/sign-up", userService.SignUp);
app.post("/sign-in", userService.SignIn);

let currentDocument = { text: "" };
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }
  try {
    const decoded = verifyToken(token)
    
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});
io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("load-doc", currentDocument);

  socket.on("update-doc", (data) => {
    console.log("data", data);
    socket.broadcast.emit("update-doc", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



server.listen(port, () => {
  console.log("server is running", port);
});
