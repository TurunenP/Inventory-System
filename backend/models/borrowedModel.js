const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
   quantity: {
      type: Number,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'returned'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Borrow', borrowSchema);
