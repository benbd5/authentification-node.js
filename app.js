// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const Post = require("./database/models/articles");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose
mongoose.connect("mongodb://localhost:27017/blog_philippe", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Static
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Articles
app.get("/articles/add", (req, res) => {
  res.render("articles/add");
});

// Post
app.post("/articles/post", (req, res) => {
  Post.create(req.body, (err, post) => {
    res.redirect("/");
  });
  console.log(req.body);
});

// Server
app.listen(port, () => {
  console.log("Serveur tourne sur le port " + port);
});
