const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the account is blocked
    if (user.is_blocked) {
      return res
        .status(401)
        .json({
          error:
            "Your account has been blocked. Please contact support for assistance.",
        });
    }

    if (await bcrypt.compare(password, user.oldpassword)) {
      return res.status(401).json({ error: "Old password" });
    }

    // Check if the entered password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Increment the failed login attempts count
      user.failedLoginAttempts += 1;
      await user.save();

      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate an access token with a short expiration time
    const accessToken = jwt.sign(
      { userId: user._id },
      "your_access_token_secret",
      {
        expiresIn: "15m",
      }
    );

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign(
      { userId: user._id },
      "your_refresh_token_secret",
      {
        expiresIn: "15d",
      }
    );

    // Save accesstoken and refeshtoken in db
    user.failedLoginAttempts = 0;
    //user.is_blocked = true;
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    res
      .status(200)
      .json({
        success: "true",
        message: "Login Success",
        id : user._id,
        firstname : user.firstname,
        lastname : user.lastname,
        username : user.username,
        currency : user.currency,
        email,
        balance : user.balance,
        accessToken,
        refreshToken,
      });

    next();
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
