import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Format user response consistently
const formatUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  credits: user.credits,
});

// API to register a new user
export const registerUser = async (req, res) => {
  let { username, email, password } = req.body;

  // Validate input exists
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username, email, and password are required' 
    });
  }

  // Convert to strings to handle frontend type issues
  username = String(username);
  email = String(email);
  password = String(password);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(`Registration attempt failed - User already exists: ${email}`);
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    // password will be automatically hashed by the pre-save hook
    const user = await User.create({
      username,
      email,
      password,
    });

    console.log(`New user registered successfully: ${email}`);

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API to login a user
export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  // Validate input exists
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Convert to strings to handle frontend type issues
  email = String(email);
  password = String(password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Log failed login attempt (email only, no sensitive data)
      console.log(`Failed login attempt for email: ${email} - User not found`);
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // compare given password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Log failed login attempt (email only, no sensitive data)
      console.log(`Failed login attempt for email: ${email} - Invalid password`);
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Log successful login (email only)
    console.log(`Successful login for user: ${email}`);

    const token = generateToken(user._id);
    res.json({
      success: true,
      message: 'User logged in successfully',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    // Only log error message, not sensitive details
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// API to get user data
export const userData = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'User data fetched successfully',
      user: formatUser(req.user),
    });
  } catch (error) {
    console.error("User Data Error:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};