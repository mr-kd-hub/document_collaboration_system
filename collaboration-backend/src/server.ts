import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import documentRoute from "./routes/document.route"
import userRoute from "./routes/user.route"
const dotenv = require("dotenv");
dotenv.config();
import auth from "./auth.middleware";
import { verifyToken } from "./helper";
import documentModel from "./model/document.model";
import bodyParser from "body-parser";
const port = process.env.PORT || 3000;
const frontendURL = process.env.FE_URL || "http://localhost:3000";

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/collaboration";

const app = express();
app.use(cors());

//Init sockate
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendURL,
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());

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

app.use("/auth", userRoute);
app.use("/doc",auth, documentRoute);

//Auth check
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: Token missing"));
  }
  try {
    const decoded = verifyToken(token)
    if(!decoded){
      return socket.emit('error', 'Unauthorized');
    }
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join-document", async ({ documentId, token }) => {
    socket.join(documentId);
    //load initial document content
    const document = await documentModel.findById(documentId).lean();
    if (document) {
      socket.emit("load-document", document.content);
    }
  });

  socket.on("update-document", async ({ documentId, content }) => {
    await documentModel.findByIdAndUpdate(documentId, { content });
    socket.to(documentId).emit("update-document", content);
  });
  
  // socket.on("update-doc", (data) => {
  //   console.log("data", data);
  //   socket.broadcast.emit("update-doc", data);
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});



server.listen(port, () => {
  console.log("server is running", port);
});
