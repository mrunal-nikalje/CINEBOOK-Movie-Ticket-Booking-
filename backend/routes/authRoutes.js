const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ---------------- Register ----------------
router.post("/register", async (req, res) => {
  try {
    // check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    await user.save();
    res.json({ message: "User Registered" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

// ---------------- Login ----------------
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

// ---------------- Profile ----------------
router.get("/profile", async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findById(userId).select("-password"); // don't return password
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
});

// ---------------- Update Profile ----------------
router.put("/profile", async (req, res) => {
  try {
    const userId = req.query.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        dob: req.body.dob,
        contact: req.body.contact,
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      error: err
    });
  }
});     

module.exports = router;
