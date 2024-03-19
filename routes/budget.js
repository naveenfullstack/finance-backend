const express = require("express");
const router = express.Router();
const Budget = require("../models/budget");
const authenticateUser = require("../middlewares/authenticateUser");

// Route for adding a budget
router.post("/add", authenticateUser, async (req, res) => {
  try {
    const { name, type, user_id, currency_id } = req.body;

    // Create a new budget
    const newBudget = new Budget({
      name,
      type,
      user_id,
      currency_id,
    });

    // Save the budget to the database
    await newBudget.save();

    res.status(201).json({ message: "Budget added successfully" });
  } catch (error) {
    console.error("Error adding budget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting all budget based on user_id and currency_id
// /budgets?user_id=65f6fb5a386d109d5b13aadc&currency_id=65f8d5ea2a31e15233d1edb5 ( example route )

router.get("/", authenticateUser, async (req, res) => {
  try {
    const { user_id, currency_id } = req.query;

    // Find category with the provided user_id and currency_id
    const budgets = await Budget.find({ user_id, currency_id });

    res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for deleting a budgets based on user_id, currency_id, and category_id
router.delete("/delete/:user_id/:currency_id/:budget_id", authenticateUser, async (req, res) => {
    try {
      const { user_id, currency_id, budget_id } = req.params;

      // Find the category with the provided user_id, currency_id, and category_id
      const budget = await Budget.findOneAndDelete({
        user_id,
        currency_id,
        _id: budget_id,
      });

      if (!budget) {
        return res.status(404).json({ error: "budget not found" });
      }

      res.status(200).json({ message: "budget deleted successfully" });
    } catch (error) {
      console.error("Error deleting budget:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
