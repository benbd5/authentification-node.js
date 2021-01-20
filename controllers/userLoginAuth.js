const User = require("../database/models/user");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  // Récupère email et mdp
  const { email, password } = req.body;

  //   Compare hash mdp
  User.findOne({ email }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // le cookie prend l'id de l'user
          req.session.userId = user._id;

          res.redirect("/");
        } else {
          res.redirect("/user/login");
        }
      });
    } else {
      return res.redirect("/user/login");
    }
  });
};
