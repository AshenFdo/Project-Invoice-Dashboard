import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user in the database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};


// @desc    Login a user
// @route   POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not exist" });
  }
  
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate a JWT
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Respond with user data and token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
    message: "Login successful",
  });

};



export { registerUser, loginUser };
