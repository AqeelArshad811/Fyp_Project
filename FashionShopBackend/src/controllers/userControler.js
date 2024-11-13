const {User} =require("../models/userModel");

module.exports.registerUser = async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        const user = new User({ username, email, password });
        const newUser = await user.save()
                res.status(201).json({ message: "User registered successfully", data:newUser ,success: true })
    } catch(error){
        console.log(error)
        res.status(500).json({ message: "Error registering user", error ,success: false });
    }
}