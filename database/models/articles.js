const mongoose = require("mongoose");

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
