const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next();
}),

    userSchema.pre("findOneAndUpdate", async function (next) {
        const update = await this.getUpdate()
        if (update.password) {
            update.password = await bcrypt.hash(update.password, 10)
        }
        next();
    }),

    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password)
    }
userSchema.methods.generateAccessToken =  function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        
         process.env.ACCESS_TOKEN_SECRET
        // "secret"
         ,
        
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        
        )
    
}
userSchema.methods.generateRefreshToken = async function () {
    return (await jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    ))
}



module.exports.User = mongoose.model("user", userSchema)