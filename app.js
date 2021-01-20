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
const expressSession = require("express-session");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(expressSession({ secret: "secretKey", name: "cookie" }));

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

// Controllers articles
const createArticleController = require("./controllers/articleAdd");
const homePageController = require("./controllers/homePage");
const contactController = require("./controllers/contact");
const articleSingleController = require("./controllers/articleSingle");
const articlePostController = require("./controllers/articlePost");

// Controllers users
const userCreate = require("./controllers/userCreate");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userLoginAuth = require("./controllers/userLoginAuth");

const articleValidPost = require("./middleware/articleValidPost");
app.use("/articles/post", articleValidPost);

// Routes articles
app.get("/", homePageController);
app.get("/contact", contactController);
app.get("/articles/add", createArticleController);
app.get("/articles/:id", articleSingleController);
app.post("/articles/post", articlePostController);

// Routes users
app.get("/user/create", userCreate);
app.get("/user/login", userLogin);
app.post("/user/register", userRegister);
app.post("/user/loginAuth", userLoginAuth);

// Server
app.listen(port, () => {
  console.log("Serveur tourne sur le port " + port);
});
