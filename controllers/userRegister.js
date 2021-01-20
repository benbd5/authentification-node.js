const User = require("../database/models/user");

module.exports = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      // si err => afficher message
      const registerError = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );

      // Flash pour afficher messages d'erreur
      req.flash("registerError", registerError);

      // Flash pour récupérer les données saisies par l'utilisateur
      req.flash("data", req.body);

      return res.redirect("/user/create");
    }

    res.redirect("/");
  });
};
