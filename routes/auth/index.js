const express = require('express');
const router = express.Router();

// Import individual route files

const SignUp = require('./signUp');
router.use('/signup', SignUp);


module.exports = router;