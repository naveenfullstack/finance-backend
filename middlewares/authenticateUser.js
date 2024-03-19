const User = require("../models/user");

async function authenticateUser(req, res, next) {
    const userId = req.headers.userid;
    const accessToken = req.headers.accesstoken;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.access_token !== accessToken) {
            return res.status(401).json({ message: "Invalid access token" });
        }

        // If access token matches, attach the user object to the request
        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authenticateUser;
