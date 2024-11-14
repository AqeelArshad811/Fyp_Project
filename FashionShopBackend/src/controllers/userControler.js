const { User } = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    const existedUser = await User.findOne(
        {
            $or: [
                {
                    username
                }, {
                    email
                }]
        })
    if (existedUser) {
        return res.status(409).json({ message: "User already exists", success: false });
    }

    try {
        const user = new User({ username, email, password });
        const newUser = await user.save()
        const userWithoutPassword = await User.findById(newUser._id).select("-password -refreshToken")
        res.status(201).json({ message: "User registered successfully", data: userWithoutPassword, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while registering user", error, success: false });
    }
}

module.exports.loginUser = async (req, res) => {
    const { email, username, password } = req.body
    try {
        
        if (!(email || username)) {
            throw new ApiError(400, "username or email  are required")
        }
        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            throw new ApiError(401, "Password Is In-Corect ");
        }
    
        const userWithoutPassword = await User.findById(user._id).select("-password -refreshToken")
        res.status(200).json(
            // { message: "User logged in successfully", data: userWithoutPassword, success: true }
            new ApiResponse(200, userWithoutPassword, "User logged in successfully")
        )
    } catch (error) {
     console.log("error in login user",error)
     throw new ApiError(401, error?.message|| "Invalid access token ")
        
    }


}