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

module.exports = authControllers;
