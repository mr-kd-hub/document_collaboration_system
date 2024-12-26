import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

export const encryptPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, 8);
  } catch (err) {
    return password;
  }
};

export const decryptPassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    return password;
  }
};

export const generateToken = async(payload:any) => {
    try{
        let token = await jwt.sign({ userId : String(payload._id)}, 'shhhhh');
        return token
    }
    catch(err){
        console.log("errpr in token gen",err);
    }

}

export const verifyToken = (token: string) => {
    try{
        return jwt.verify(token,'shhhhh')
    }
    catch(err){
        console.log("error in tokn validation");
        
    }
}
