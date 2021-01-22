// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session"); // pour les cookies
const MongoStore = require("connect-mongo")(expressSession); // stock cookie dans mongoDB
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { stripTags } = require("./helpers/hbs");
require("dotenv").config();

var helpers = require("handlebars-helpers")();

const auth = require("./middleware/auth");
const redirectAuth = require("./middleware/redirectAuth");

// Mongoose
mongoose.connect(
  process.env.DATABASE_URL || "mongodb://localhost:27017/blog_philippe",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(
  expressSession({
    secret: "secretKey",
    name: "cookie",
    resave: false,
    saveUninitialized: true,

    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
app.use(methodOverride("_method"));

// Static
app.use(express.static("public"));

// Moment (Handlebars)
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Handlebars
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      stripTags: stripTags,
    },
  })
);

app.use("*", (req, res, next) => {
  res.locals.user = req.session.userId;
  console.log(res.locals.user);
  next();
});

// Controllers articles
const createArticleController = require("./controllers/articleAdd");
const homePageController = require("./controllers/homePage");
const contactController = require("./controllers/contact");
const articleSingleController = require("./controllers/articleSingle");
const articlePostController = require("./controllers/articlePost");
const articleUpdateController = require("./controllers/articleUpdate");
const articleEditController = require("./controllers/articleEdit");
const articleDeleteController = require("./controllers/articleDelete");

// Controllers users
const userCreate = require("./controllers/userCreate");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userLoginAuth = require("./controllers/userLoginAuth");
const userLogout = require("./controllers/userLogout");

const articleValidPost = require("./middleware/articleValidPost");
app.use("/articles/post", articleValidPost);
app.use("/articles/add", auth);

// Routes articles
app.get("/", homePageController);
app.get("/contact", contactController);
app.get("/articles/add", auth, createArticleController);
app.get("/articles/:id", articleSingleController); // show article
app.get("/articles/edit/:id", auth, articleEditController); // edit article
app.put("/articles/:id", auth, articleUpdateController); // update article
app.post("/articles/post", auth, articleValidPost, articlePostController);
app.delete("/articles/:id", auth, articleDeleteController);

// Routes users
app.get("/user/create", redirectAuth, userCreate);
app.get("/user/login", redirectAuth, userLogin);
app.get("/user/logout", userLogout);
app.post("/user/register", redirectAuth, userRegister);
app.post("/user/loginAuth", redirectAuth, userLoginAuth);

app.use((req, res) => {
  res.render("error404");
});

// Server
app.listen(port, () => {
  console.log("Serveur tourne sur le port " + port);
});
