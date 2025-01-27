const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "General",
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

blogPostSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
