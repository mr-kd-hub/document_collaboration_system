import mongoose, { Schema } from "mongoose";
import { encryptPassword } from "../helper";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }

    // email: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     lowercase: true
    //   },
    //   password: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 3,
    //   },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  const user = this;
  console.log("pre save hook", user);
  const hashedPassword = await encryptPassword(user.password)
  user.password = hashedPassword;
  next();
});

export default mongoose.model("User", userSchema);
