// const mongoose = require("mongoose");
// //const GridFsStorage = require("multer-gridfs-storage");
// const { GridFsStorage } = require("multer-gridfs-storage"); 
// const multer = require("multer");

// const mongoURI = process.env.MONGO_URI; // Your MongoDB connection string
// //console.log(process.env.MONGO_URI);

// //Define file storage
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: "uploads", // Use the same bucket name
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
// }); // Change 'image' to match the file field name in your request

// module.exports = upload;



const multer = require("multer");

//Define file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  },
});

// Specify file format that can be saved
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true); // Accept file
  } else {
    cb (null, false)
    //cb(new Error('Invalid file type, only JPG and PNG are allowed!'), false); // Reject file
  }
};

// Initialize multer with the specified storage and file filter
const upload = multer({ storage, fileFilter });

//File size Formatter
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']; 
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index];
}

module.exports = {upload, fileSizeFormatter}