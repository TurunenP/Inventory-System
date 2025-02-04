require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

const testEmail = async () => {
  const subject = "Test Subject";
  const message = "<p>This is a test message.</p>";
  const send_to = process.env.EMAIL_USER; // Sending to your email
  const sent_from = process.env.EMAIL_USER; // Sender's email
  const reply_to = "reply-to@example.com"; // A test reply-to email

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    console.log("Test email sent successfully.");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

testEmail();
