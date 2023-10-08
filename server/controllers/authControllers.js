const authControllers = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register controller
authControllers.post("/register", async (req, res) => {
  try {
    let isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(400).json("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const { password, ...others } = newUser._doc; // make password safe we don't return to user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(200).json({ user: others, token });
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
