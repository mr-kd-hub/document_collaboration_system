import mongoose, { Schema } from "mongoose";
import { encryptPassword } from "../helper";

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: "" },
    versions: [
      {
        content: String,
        title: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    is_delete:{
       type:Boolean,
       default: false,  
    },
    collaborators: [{ type: String, ref: "User" }],
  },
  { timestamps: true }
);



export default mongoose.model("Document", documentSchema);
