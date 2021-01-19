const mongoose = require("mongoose");

const Article = require("./database/models/articles");

mongoose.connect("mongodb://localhost:27017/blog-test");

Article.find({}, (err, articles) => {
  console.log(err, articles);
});

Article.create(
  {
    title: "Avenger",
    intro: "film",
    content: "critique",
  },
  (err, post) => {
    console.log(err, post);
  }
);
