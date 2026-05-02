import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const users = await User.findOne({ email });
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        user: null,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
        user: null,
      });
    }

    const token = jwt.sign({ email: users.email }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: users._id,
        username: users.username,
        email: users.email,
        phone: users.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};
