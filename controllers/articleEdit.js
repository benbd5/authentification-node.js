const Article = require("../database/models/articles");

module.exports = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render("edit", { article: article });
  } catch {
    res.redirect("/");
  }
};
