const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Routes
app.get("/", (req, res) => {
  const hello = "Hello world";
  res.render("index", { hello: hello });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log("Serveur tourne sur le port" + port);
});
