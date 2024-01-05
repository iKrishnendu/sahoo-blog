const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Types.ObjectId,
      ref: "Blog", // Reference to the Blog model
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
