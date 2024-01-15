const nodemailer = require("nodemailer");
// const YOUR_BASE_URL = "http://localhost:3000";
const client_url = process.env.CLIENT_BASE_URL;

function generateVerificationToken() {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
}

function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    // Configure your email transport settings
    // Example for Gmail:
    service: "gmail",
    auth: {
      user: "krishnendusahoo.edu@gmail.com",
      pass: "pfkz mtpg ujfa kvpe",
    },
  });

  const mailOptions = {
    from: "krishnendusahoo.edu@gmail.com",
    to: email,
    subject: "Verify Your Email",
    text: `Click the following link to verify your email: ${client_url}/verify?token=${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  generateVerificationToken,
  sendVerificationEmail,
};
