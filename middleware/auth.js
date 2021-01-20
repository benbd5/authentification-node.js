const User = require("../database/models/user");

module.exports = (req, res, next) => {
  // Connect dans db
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) return res.redirect("/user/login");
    next();
  });
  // Vérifier l'utilisateur dans db

  // Si user est dans db

  // Sinon il est redirigé
};
