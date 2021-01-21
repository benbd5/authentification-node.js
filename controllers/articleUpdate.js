const Article = require("../database/models/articles");

module.exports = async (req, res) => {
  let article;
  try {
    article = await Article.findById(req.params.id); // on récupère l'id

    // En dessous : on récupère les nouvelles valeurs
    article.title = req.body.title;
    article.content = req.body.content;
    article.author = req.body.author;

    await article.save(); // save in db

    res.redirect(`${article.id}`); // redirect vers article
  } catch {
    res.redirect("/");
  }
};
