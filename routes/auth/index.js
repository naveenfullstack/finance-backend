const express = require('express');
const router = express.Router();

// Import individual route files

const Login = require('./login');
router.use('/login', Login);

const SignUp = require('./signUp');
router.use('/signup', SignUp);


module.exports = router;