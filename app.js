// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

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

// Controllers
const createArticleController = require("./controllers/articleAdd");
const homePageController = require("./controllers/homePage");
const contactController = require("./controllers/contact");
const articleSingleController = require("./controllers/articleSingle");
const articlePostController = require("./controllers/articlePost");

const middleware = (req, res, next) => {
  if (!req.files) {
    return res.redirect("/");
  }
  next();
};

app.use("/articles/post", middleware);

// Routes
app.get("/", homePageController);
app.get("/contact", contactController);
app.get("/articles/add", createArticleController);
app.get("/articles/:id", articleSingleController);
app.post("/articles/post", articlePostController);

// Server
app.listen(port, () => {
  console.log("Serveur tourne sur le port " + port);
});
