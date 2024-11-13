const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String  
    },
},{timestamps:true})

module.exports.User = mongoose.model("user", userSchema)