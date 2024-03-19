const express = require("express");
const router = express.Router();
const Transactions = require("../models/transactions");
const authenticateUser = require("../middlewares/authenticateUser")

// Route for adding a transaction
router.post("/add", authenticateUser, async (req, res) => {
  try {
    const { title, payment_method, type, category_name, category_id, amount, invoice, currency_id, user_id, budget_id } = req.body;

    // Create a new transaction
    const newTransaction = new Transactions({
      title,
      payment_method,
      type,
      category_name,
      category_id,
      amount,
      invoice,
      currency_id,
      user_id,
      budget_id
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route for getting all transactions based on user_id and currency_id
router.get("/", authenticateUser, async (req, res) => {
  try {
    const { user_id, currency_id } = req.query;

    // Find transactions with the provided user_id and currency_id
    const transactions = await Transactions.find({ user_id, currency_id });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route for deleting a transaction based on user_id, currency_id, and transaction_id
router.delete("/delete/:user_id/:currency_id/:transaction_id", authenticateUser, async (req, res) => {
    try {
      const { user_id, currency_id, transaction_id } = req.params;
  
      // Find the transaction with the provided user_id, currency_id, and transaction_id
      const transaction = await Transactions.findOneAndDelete({ user_id, currency_id, _id: transaction_id });
  
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
  
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
