const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String  
    },
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password=await bcrypt.hash(this.password,10)
    next();
}),

userSchema.pre("findOneAndUpdate",async function(next){
    const update=await this.getUpdate()
    if(update.password){
        update.password=await bcrypt.hash(update.password,10)
    }
    next();
}),

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
},



// )

module.exports.User = mongoose.model("user", userSchema)