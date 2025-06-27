import User from "../models/user-model.js";
import bcrypt from "bcrypt";

// Home Controller
const home = async (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to the home page!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

// Register Controller
const register = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ message: "Phone number already exists." });
    }

    const newUser = new User({ fullname, email, phone, password });
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateToken();

    res.status(201).json({
      message: "User registered successfully.",
      token: token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, Please register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = user.generateToken();

    res.status(200).json({
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
};

// Get user details
const getUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "User data fetched successfully.",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user data.",
      error: error.message,
    });
  }
};

export default { home, register, login, getUser };
