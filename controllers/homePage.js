const Post = require("../database/models/articles");

module.exports = async (req, res) => {
  const posts = await Post.find({});

  res.render("index", { posts });
};
