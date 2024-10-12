import { UserModel } from "../Models/user.Schema.js";
import { hashPassword } from "../Utils/passwordHasher.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { createUserToken } from "../Utils/userTokenCreator.js";
export const userRegistrationController = async (req, res)=>{
    let {fName, username, email, password, phone} = req.body;
    try {
       const newPassword = await hashPassword(password);
       password = newPassword;
       console.log(fName, username, email, password, phone);
      const registerUser = await UserModel.create({fName, username, email, password, phone});
      console.log("User has been successfully created ", registerUser);
      return res.status(201).json({message : "OK"});
    } catch (error) {
        console.log(error);
      return res.status(500).json({message : "Sorry we cant registered you plz fix the bug first ", error});
    }
};

export const userLoggedInUserController = async (req, res)=>{
    const {email, password} = req.body;
    console.log("User loggedIn ", email, password);
    
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            console.log("User Not Found your email is invalid");
            return res.status(401).json({message:"Invalid Email"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            console.log("User Not Found your password is invalid");
            return res.status(401).json({message:"Invalid Password"});
        }
        const userToken = await createUserToken(user);
        console.log(userToken);
        
        return res.status(201).cookie("auth_token", userToken, {maxAge : 3600000}).json({message : "User logged in"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message : "Sorry we cant loggedIn you plz fix the bug first ", error});
    }
}
export const userLoggedInChecker = (req, res)=>{
    return res.status(201).json({message : "You are already loggedIn"});
}
export const userDeleteController = async (req, res) =>{
    const {email, password} = req.body;
    try {
       const user = await UserModel.findOne(email);
       if(!user) {
        console.log("User Not Found your email is invalid");
        return res.status(401).json({message:"Invalid Email"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        console.log("User Not Found your password is invalid");
        return res.status(401).json({message:"Invalid Password"});
    }
    const userDeleted = await UserModel.findByIdAndDelete(user_id);
    console.log("User has been successfully deleted ", user, userDeleted);
    return res.status(201).json({message:"User has been successfully deleted"})
    } catch (error) {
        console.log("Due to some issues we cant delete your account plz fix the bug first ", error);
        return res.status(500).json({message : "Due to some issues we cant delete your account plz fix the bug first"})
    }
}
export const userLoggedOutController = async (req, res)=>{
    try {
        return res.status(201).clearCookie(userToken).json({message : "User has been successfully logged out"});
    } catch (error) {
        console.log("User could not logged out due to this error plz fix the bug first ", error)
        return res.status(500).clearCookie(userToken).json({message : "User could not logged out"});
    }
   
}