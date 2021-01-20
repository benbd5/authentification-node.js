module.exports = (req, res) => {
  // lié à userRegister pour gérer le message d'erreur

  res.render("register", {
    // Flash pour afficher messages d'erreur
    errors: req.flash("registerError"),

    // Flash a stocké les données saisies, permet de ne pas perdre les données saisies lors d'une erreur
    data: req.flash("data")[0],
  });
};
