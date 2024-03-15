const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../modlers/user");

router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      mobile_number,
      personal_account,
      business_account,
    } = req.body;

    // Check if the email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "email already exists" });
    }

    // Check if the Mobile Number is already taken
    const existingMobileNumber = await User.findOne({ email });
    if (existingMobileNumber) {
      return res.status(409).json({
        error: "Mobile number already associated with another account",
      });
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Create a new user with the encrypted password
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      mobile_number,
      personal_account,
      business_account,
      access_token: token,
      refresh_token : refreshToken,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Account created successfully",
      id: newUser._id,
      first_name,
      last_name,
      email,
      mobile_number,
      personal_account,
      business_account,
      access_token: token,
      refresh_token : refreshToken,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
