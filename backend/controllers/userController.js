const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();


//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }
  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // validating email
  if (role === 'admin') {
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'university.edu') {
      return res
        .status(400)
        .json({ message: 'You must register with a valid staff email.' });
    }
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user', // Default role if not provided
  });

  // Generate token
  const token = generateToken(user._id);

  // Send cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
  
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  if (user) {
    const { _id, name, email, phone, bio, photo, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Request received:', { email, password });

    // Validate Request
    if (!email || !password) {
      res.status(400).json({ message: 'Please add email and password' });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log('User not found:', email);
      res.status(400).json({ message: 'User not found, please signup' });
      return;
    }

    console.log('User found:', user);

    // Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    console.log('Password is correct:', passwordIsCorrect);

    if (!passwordIsCorrect) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
    });

    // Get user info
    const { _id, name, email: userEmail, phone, bio, photo, role } = user;
    res.status(200).json({
      _id,
      name,
      email: userEmail,
      phone,
      bio,
      photo,
      role,
      token,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Logout user
const logout = asyncHandler(async (req, res) => {
  // res.send('Logout user')

  // Clear the token cookie
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
    secure: false,
  });
  //return res.send(200).json({ message: "Succesfully Logged out" });
  // Return success response
  res.status(200).json({ message: 'Successfully Logged out' });
});

//Get user profile/data
const getUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token


    const userId = decoded.id; // Extract userId from token

    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, name, photo, email, phone, bio, role } = userProfile;

    res.status(200).json({ _id, name, email, photo, phone, bio, role });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token or user not found' });
  }
};


//Get students profile/data
const getStudents = asyncHandler(async (req, res) => {
  //res.send('Get User Data')
  const users = await User.find({ role: 'user' });

  if (users) {
    res.status(200).json({
      users,
    });
  } else {
    res.status(400);
    throw new Error('User not Found');
  }
});


//Update user
const updateUser = asyncHandler(async (req, res) => {
  //res.send('User updated')
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, bio, photo } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
    });
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});


module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  getStudents,
};
