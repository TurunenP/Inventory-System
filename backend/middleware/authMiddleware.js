const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
 
  


    if (!token) {
      res.status(401);      
      throw new Error('Not authorized, please login');
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
   

    // Get user from DB
    const user = await User.findById(verified.id).select('-password');
    

    req.user = user;
    next();
  } catch (error) {
    console.log('Auth Error:', error.message); // Log actual error message
    res.status(401).json({ message: 'Not authorized, please login' }); // Send proper JSON response
  }
});


// Role-based middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('You do not have permission to perform this action');
    }
    next();
  };
};

module.exports = { protect, authorize };




