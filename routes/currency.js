const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');
const authenticateUser = require("../middlewares/authenticateUser")

// Route to add a currency
router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { currency_name, country, user_id, flag } = req.body;

    // Create a new currency document
    const newCurrency = new Currency({
      currency_name,
      country,
      user_id,
      flag
    });

    // Save the new currency to the database
    await newCurrency.save();

    res.status(201).json({ message: 'Currency added successfully', currency: newCurrency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all currencies for a specific user_id
router.post('/getall', authenticateUser, async (req, res) => {
  try {
    const { user_id } = req.body;

    // Find all currencies with the provided user_id
    const currencies = await Currency.find({ user_id });

    res.status(200).json({ currencies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
