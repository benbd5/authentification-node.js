const Post = require("../database/models/articles");

module.exports = async (req, res) => {
  const posts = await Post.find({})
    // tri par ordre décroissant des dates
    .sort({
      createdAt: "desc",
    })
    // et limite à 4 le nombre d'articles
    .limit(4);

  res.render("index", { posts });
};
