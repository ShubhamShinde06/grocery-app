import { userModel } from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user has already register
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        error: "User already exists",
      });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        error: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        error: "Please enter a strong password",
      });
    }

    //password convert in not reading human format
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    //check the user not exist
    if (!user) {
      return res.json({
        success: false,
        error: "User doesn't exists",
      });
    }

    //database password and user-login-password equl
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        error: "Password is wrong",
      });
    }

    generateTokenAndSetCookie(res, user._id)

    res.status(200).json({
        success: true,
        message:"Logged Successfully",
        user:{
            ...user._doc,
            password: undefined
        }
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in login",
    });
  }
};

export const checkAuth = async (req, res) => {
    try {
        
        const user = await userModel.findById(req.userId).select("-password")

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found!"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error in check-auth",
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  };
