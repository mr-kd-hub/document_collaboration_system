import { Request, Response } from "express";
import validator from "validator";
import User from "../model/user.mode";
import { decryptPassword, generateToken } from "../helper";
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(403).send({
        message: "No data provided",
      });
    if (!validator.isEmail(email))
      return res.status(403).send({
        message: "Provide valid email",
      });

    const user: any = new User({
      email: email,
      password,
    });
    await user.save();
    return res.status(201).send({
      message: "User created",
    });
  } catch (err: any) {
    res.status(500).send({
      msg: err.message || "Server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(403).send({
          message: "No data provided",
        });
      if (!validator.isEmail(email))
        return res.status(403).send({
          message: "Provide valid email",
        });
    const user = await User.findOne({ email: email }).lean();
    if(!user) return res.status(204).send({
        message:"No user found with given email please regiser"
    })
    const isMatch = await decryptPassword(password, user.password);
    
    if(!isMatch) return res.status(401).send({
        message: "Wrong password"
    })
    
    const token = await generateToken(user)
    return res.status(200).send({
        token
    })

  } catch (err: any) {
    return res.status(500).send({
      message: err.message || "Server error",
    });
  }
};
