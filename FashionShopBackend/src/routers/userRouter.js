const express = require("express");
const router = express.Router();
const  userController  = require("../controllers/userControler");

router.post("/register",userController.registerUser );
// router.post("/login", loginUser);

module.exports = router;