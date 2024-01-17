const categoryControllers = require("express").Router();
const Category = require("../models/Category");
const Blog = require("../models/Blog");

// Create a new category
categoryControllers.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all categories
categoryControllers.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get blogs by category
categoryControllers.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const blogs = await Blog.find({ category })
      .populate("userId", "-password")
      .exec();

    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = categoryControllers;
