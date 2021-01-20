const path = require("path");
const Post = require("../database/models/articles");

module.exports = (req, res) => {
  const image = req.files.image;

  const uploadFile = path.resolve(
    __dirname,
    "..",
    "public/articles",
    image.name
  );

  image.mv(uploadFile, (err) => {
    Post.create(
      {
        ...req.body,
        image: `/articles/${image.name}`,
      },
      (err, post) => {
        res.redirect("/");
      }
    );
  });
};
