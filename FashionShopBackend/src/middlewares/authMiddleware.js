const User=require("../models/userModel")
const jwt=require("jsonwebtoken")
const ApiError=require("../utils/ApiError")

modeule.exports.verifyToken=async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken
        if(!token){
            throw new ApiError(401,"Access token not found")
        }
        jwt.verify(cookie, config.SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                // if token has been altered or has expired, return an unauthorized error
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login" });
            }
            const { id } = decoded; // get user id from the decoded token
            const user = await User.findById(id); // find user by that `id`
            const { password, ...data } = user._doc; // return user object without the password
            req.user = data; // put the data object into req.user
            next();
        });
        
        
        
        }
        
    

    } catch (error) {
        
    }
