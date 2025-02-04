const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  getStudents,
  
} = require('../controllers/userController');
const protection = require('../middleware/authMiddleware');
// const auth = require('../middleware/authMiddleware');

// const registerUser = () => {}

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getuser', protection.protect, getUser);
router.get('/getstudents', getStudents);
router.patch('/updateuser', protection.protect , updateUser);


module.exports = router;
