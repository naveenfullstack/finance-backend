const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");
const authenticateUser = require("../middlewares/authenticateUser");

// Route for adding a category
router.post("/add", authenticateUser, async (req, res) => {
  try {
    const { name, type, user_id, currency_id } = req.body;

    // Create a new category
    const newCategory = new Categories({
      name,
      type,
      user_id,
      currency_id,
    });

    // Save the category to the database
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for getting all categories based on user_id and currency_id
// /categories?user_id=65f6fb5a386d109d5b13aadc&currency_id=65f8d5ea2a31e15233d1edb5 ( example route )

router.get("/", authenticateUser, async (req, res) => {
  try {
    const { user_id, currency_id } = req.query;

    // Find category with the provided user_id and currency_id
    const categories = await Categories.find({ user_id, currency_id });

    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for deleting a categories based on user_id, currency_id, and category_id
router.delete("/delete/:user_id/:currency_id/:category_id", authenticateUser, async (req, res) => {
    try {
      const { user_id, currency_id, category_id } = req.params;

      // Find the category with the provided user_id, currency_id, and category_id
      const category = await Categories.findOneAndDelete({
        user_id,
        currency_id,
        _id: category_id,
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
