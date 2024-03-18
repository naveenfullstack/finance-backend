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
      return res.status(401).json({
        error:
          "Your account has been blocked. Please contact support for assistance.",
      });
    }

    // Check if old password is provided and valid
    if (user.old_password && (await bcrypt.compare(password, user.old_password))) {
      return res.status(401).json({ error: "Old password" });
    }

    // Check if the entered password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Increment the failed login attempts count
      user.failed_login_attempts += 1;
      await user.save();

      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate an access token with a short expiration time
    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    // Generate a refresh token with a longer expiration time
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );

    // Save access token and refresh token in db
    user.failed_login_attempts = 0;
    user.access_token = accessToken;
    user.refresh_token = refreshToken;
    user.last_login = new Date();
    await user.save();

    // Prepare account details object
    let accountDetails = {
      id: user._id,
      firstname: user.first_name,
      lastname: user.last_name,
      personal_account: user.personal_account,
      business_account: user.business_account,
      email,
      account_created: user.account_created,
      secondary_auth: user.secondary_auth,
    };

    // Conditionally include access_token and refresh_token based on secondary_auth
    if (!user.secondary_auth) {
      accountDetails.access_token = accessToken;
      accountDetails.refresh_token = refreshToken;
    }

    // Prepare response object
    let responseObject = {
      success: true,
      message: "Login Success",
      account_details: [accountDetails],
    };

    // Send response
    res.status(200).json(responseObject);

    next();
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
