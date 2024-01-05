// In commentControllers.js
const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Add a new comment to a blog
router.post("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId, text } = req.body;
    console.log(req.body, blogId);

    if (!blogId || !userId || !text) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const newComment = new Comment({ blogId, userId, text });
    await newComment.save();

    // Populate the userId field with the username before sending the response
    const populatedComment = await Comment.findById(newComment._id)
      .populate("userId", "username")
      .exec();

    res.json(populatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all comments
router.get("/all/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "username"
    );
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
