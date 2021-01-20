const User = require("../database/models/user");

module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.redirect("/user/create");

    res.redirect("/");
  });
};
