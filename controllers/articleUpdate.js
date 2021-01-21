const Article = require("../database/models/articles");

module.exports = async (req, res) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.content = req.body.content;
    article.author = req.body.author;

    await article.save();
    console.log(article);
    res.redirect(`${article.id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
