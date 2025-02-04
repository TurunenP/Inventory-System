const express = require('express');
const router = express.Router();
const {
  borrowEquipment,
  approveBorrow,
  returnEquipment,
  getAllBorrows,
  getUserBorrows,
} = require('../controllers/borrowedController');

const protection = require('../middleware/authMiddleware');

router.post('/borrow',  borrowEquipment);
router.patch('/approve/:id',  approveBorrow);
router.patch('/return/:id',  returnEquipment)
router.get('/borrows',  getAllBorrows);
router.get('/getborrows/:email',  getUserBorrows);

module.exports = router;
