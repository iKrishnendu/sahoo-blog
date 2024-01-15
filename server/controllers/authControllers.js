const authControllers = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require("google-auth-library");
// const passport = require("../middlewares/passport-setup");

const {
  generateVerificationToken,
  sendVerificationEmail,
} = require("../utils/emailUtils");
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//register controller
authControllers.post("/register", async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });

    // Check if a user with the provided email exists and is not verified
    if (existingUser && !existingUser.isVerified) {
      const currentTimestamp = new Date();
      const registrationTimestamp = existingUser.createdAt; // Assuming you have a createdAt field in your User model

      // Check if the user registration is within the allowed timeframe (e.g., 2 minutes)
      const registrationTimeDiff = currentTimestamp - registrationTimestamp;
      const registrationTimeThreshold = 2 * 60 * 1000; // 2 minutes in milliseconds

      if (registrationTimeDiff < registrationTimeThreshold) {
        // User tried to verify within the allowed timeframe, return an appropriate response
        return res
          .status(400)
          .json(
            "Email verification is pending. Check your email for the verification link. Or Try again after 2 mins."
          );
      } else {
        // User didn't verify within the allowed timeframe, remove the user and proceed with registration
        await existingUser.remove();
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const verificationToken = generateVerificationToken();

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      verificationToken: verificationToken,
    });

    const { password, ...others } = newUser._doc;

    sendVerificationEmail(newUser.email, verificationToken);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Verify email route
authControllers.get("/verify", async (req, res) => {
  try {
    const { token } = req.query;

    // Find the user by the verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (user.isVerified) {
      return res.status(400).json("Token is Expire");
    }
    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Dispatch login action here
    const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const { password, ...others } = user._doc; // Exclude password from the response
    // Add any other user information you want to include in the response

    const url = process.env.CLIENT_BASE_URL;

    res.status(200).json({ user: others, token: userToken, url });
    // Redirect the user to the home page or any other designated page
    // You can pass the token as a query parameter or in a response
    // res.redirect(`http://localhost:3000/verify?token=${userToken}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login controller
authControllers.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Wrong credentials");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong credentials");
    }
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update user profile (username, email, password) if password matches
authControllers.put("/update-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, username, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if the provided current password matches the one in the database
    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(400).json("Current password is incorrect");
    }

    // Hash the new password if provided
    let hashedPassword = user.password;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    // Update user profile fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: username || user.username,
          email: email || user.email,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = authControllers;
