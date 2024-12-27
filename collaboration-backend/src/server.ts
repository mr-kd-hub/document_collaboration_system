import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import * as userService from "./service/user.service";
const dotenv = require('dotenv');
dotenv.config();
import auth from "./auth.middleware";
const port =  process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI  || "mongodb://localhost:27017/collaboration"

const app = express();
app.use(express.json());
app.use(cors())
//mongodb://localhost:27017
app.use((req, res, next) => {
  console.log(`Request ${req.method} and api ${req.url}`);
  next();
});
app.post("/sign-up", userService.SignUp);
app.post("/sign-in", userService.SignIn);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

app.listen(port,() => {
  console.log("server is running", port)
});
