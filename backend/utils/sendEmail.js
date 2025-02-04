// const nodemailer = require("nodemailer");

// const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
//   //Create email Transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 587,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     //Migitiage auth /// Ensure secure TLS
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   //Options for sending email
//   const options = {
//     from: sent_from,
//     to: send_to,
//     reply: reply_to,
//     subject: subject,
//     html: message
//   };

//   //Check if email was succesfully sent
//   transporter.sendMail(options, function(err, info) {
//     if(err){
//         console.log(err)
//     }else{
//          console.log(info);
//     }   
//   })
// }

// module.exports = sendEmail


const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Log SMTP settings to debug
  console.log("Using SMTP settings:");
  console.log("Host:", process.env.EMAIL_HOST);
  console.log("User:", process.env.EMAIL_USER);

  // Log the email password (FOR DEBUGGING PURPOSES ONLY)
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  // Create email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Ensure secure TLS
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false, // Set to true in production
    },
    debug: true, // Add this for detailed debugging
    logger: true, // Add this for logging

  });
console.log("Transporter object:", transporter); 

  // Options for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to, // Corrected to replyTo
    subject: subject,
    html: message,
  };

  // Attempt to send the email
  try {
    const info = await transporter.sendMail(options);
    console.log("Email sent: ", info);
    return info; // Return info for further use
  } catch (error) {
    console.error("Error sending email: ", error);
    console.error("Error stack: ", error.stack);
    //throw new Error("Failed to send email"); // Throw an error for handling
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
