const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exits",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });


    return res.status(200).json({
      success: true,
      user,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// check username
exports.checkUserName = async (req, res) => {
    try {
        const { username } = req.body;
    
        if(!username) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }
    
        const user = await User.findOne({username});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User name has already been taken",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User name is available",
        })
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// login auth
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User doesn't exist, Please sign up first",
            });
        }

        const result = await bcrypt.compare(password, user.password);
        if(!result){
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
        
        const token =  jwt.sign(
            { email: user.email, id:user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: 24*60*60*1000,
            }
        )

        user.token = token;
        user.password = undefined;
        // await user.save();

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 24*60*60*1000),
        };
        
        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Login successful",
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}