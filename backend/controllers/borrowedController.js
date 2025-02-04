const asyncHandler = require('express-async-handler');
const Borrow = require('../models/borrowedModel');

// Request to borrow equipment
const borrowEquipment = async (req, res) => {
  const { studentName, studentEmail, equipmentName, returnDate, quantity } =
    req.body;

  if (
    !studentName ||
    !studentEmail ||
    !equipmentName ||
    !returnDate ||
    !quantity
  ) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const borrowRequest = await Borrow.create({
    studentName,
    studentEmail,
    equipmentName,
    returnDate,
    quantity,
  });

  res.status(201).json(borrowRequest);
};

// Approve borrow request
const approveBorrow = asyncHandler(async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);

  if (!borrow) {
    res.status(404);
    throw new Error('Borrow request not found');
  }

  borrow.status = 'approved';
  await borrow.save();

  res.status(200).json({ message: 'Request approved', borrow });
});

// Mark item as returned
const returnEquipment = asyncHandler(async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);

  if (!borrow) {
    res.status(404);
    throw new Error('Borrow request not found');
  }

  borrow.status = 'returned';
  await borrow.save();

  res.status(200).json({ message: 'Equipment returned', borrow });
});

// Get all borrow requests
const getAllBorrows = asyncHandler(async (req, res) => {
  const borrows = await Borrow.find();
  res.status(200).json(borrows);
});

// Fetch borrowed equipment by user email
const getUserBorrows = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400);
    throw new Error('User email is required');
  }

  const borrows = await Borrow.find({ studentEmail: email });

  if (!borrows.length) {
    res.status(404);
    throw new Error('No borrow records found for this user');
  }

  res.status(200).json(borrows);
});

module.exports = {
  borrowEquipment,
  approveBorrow,
  returnEquipment,
  getAllBorrows,
  getUserBorrows, // Add the new function to the exports
};



