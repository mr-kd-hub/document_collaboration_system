import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import documentRoute from "./routes/document.route";
import userRoute from "./routes/user.route";
const dotenv = require("dotenv");
dotenv.config();
import auth from "./auth.middleware";
import { verifyToken } from "./helper";
import documentModel from "./model/document.model";
import bodyParser from "body-parser";
import { handleCollaborators } from "./service/documents.service";
import { authSocketMiddleware, connectSocket } from "./service/socket.service";

const port = process.env.PORT || 3000;
const frontendURL = process.env.FE_URL || "http://localhost:3000";

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/collaboration";

const app = express();
app.use(cors());

//Init sockate
const server = createServer(app);
export const io = new Server(server, {
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
app.use("/doc", auth, documentRoute);

//socket APIS
io.use((socket, next) => authSocketMiddleware(socket, next));
io.on("connection", (socket) => connectSocket(socket));

server.listen(port, () => {
  console.log("server is running", port);
});
