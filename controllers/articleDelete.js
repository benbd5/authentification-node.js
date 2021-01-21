const Article = require("../database/models/articles");

module.exports = async (req, res) => {
  let article;
  article = await Article.findById(req.params.id); // on récupère l'id

  await article.remove(); // remove of db

  res.redirect("/");
};
