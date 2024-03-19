const express = require('express');
const router = express.Router();

// Import individual route files
const Auth = require('./auth/index');
router.use('/auth', Auth);

const Currency = require('./currency');
router.use('/currency', Currency);

const Transactions = require('./transactions');
router.use('/transactions', Transactions);

const Categories = require('./categories');
router.use('/categories', Categories);

const Budget = require('./budget');
router.use('/budgets', Budget);

module.exports = router;