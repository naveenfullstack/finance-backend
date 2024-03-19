const express = require('express');
const router = express.Router();

// Import individual route files
const Auth = require('./auth/index');
router.use('/auth', Auth);

const Currency = require('./currency');
router.use('/currency', Currency);


module.exports = router;