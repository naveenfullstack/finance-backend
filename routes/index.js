const express = require('express');
const router = express.Router();

// Import individual route files
const Auth = require('./auth/index');
router.use('/auth', Auth);


module.exports = router;