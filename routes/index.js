const express = require('express');
const router = express.Router();

// Import individual route files

const SignUp = require('./auth/index');
router.use('/auth', SignUp);


module.exports = router;