const Post = require("../database/models/articles");

module.exports = async (req, res) => {
  const article = await Post.findById(req.params.id);

  res.render("edit", { article });
};
