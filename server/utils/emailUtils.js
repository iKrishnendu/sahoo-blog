const nodemailer = require("nodemailer");
const client_url = process.env.CLIENT_BASE_URL;

function generateVerificationToken() {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
}

function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
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

function generateResetPasswordToken() {
  const crypto = require("crypto");
  return crypto.randomBytes(32).toString("hex");
}

function sendResetPasswordEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "krishnendusahoo.edu@gmail.com",
      pass: "pfkz mtpg ujfa kvpe",
    },
  });

  const mailOptions = {
    from: "krishnendusahoo.edu@gmail.com",
    to: email,
    subject: "Reset Your Password",
    text: `Click the following link to reset your password: ${client_url}/reset-password?token=${resetToken}`,
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
  generateResetPasswordToken,
  sendResetPasswordEmail,
};
