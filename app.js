// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/articles");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// Mongoose
mongoose.connect("mongodb://localhost:27017/blog_philippe", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Static
app.use(express.static("public"));

// Handlebars
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

// Routes
app.get("/", async (req, res) => {
  const posts = await Post.find({});

  res.render("index", { posts });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Articles
app.get("/articles/:id", async (req, res) => {
  const article = await Post.findById(req.params.id);

  res.render("articles", { article });
});

app.get("/article/add", (req, res) => {
  res.render("articles/add");
});

// Post
app.post("/articles/post", (req, res) => {
  const image = req.files.image;

  const uploadFile = path.resolve(__dirname, "public/articles", image.name);

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
});

// Server
app.listen(port, () => {
  console.log("Serveur tourne sur le port " + port);
});
