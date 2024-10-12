import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createUserToken = async (user)=>{
    const  token = jwt.sign(
    { 
        userId : user._id,
        userEmail : user.email 
    }, 
    process.env.USER_TOKEN_KEY, 
    { expiresIn: '1h' });
    return token;
}