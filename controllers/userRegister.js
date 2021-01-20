const User = require("../database/models/user");

module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    res.redirect("/");
  });
};
