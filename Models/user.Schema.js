import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName : {
        type : String,
        required : true
    }, username : {
        type : String,
        required : true,
        unique : true
    }, email : {
        type : String,
        required : true,
        unique : true
    }, password : {
        type : String
    }, phone : {
        type : String
    }
}, {timestamps:true});

export const UserModel = mongoose.model("UserModel", userSchema);