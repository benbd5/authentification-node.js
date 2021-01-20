module.exports = (req, res) => {
  if (req.session.userId) return res.render("articles/add");
  else res.redirect("/user/login");
};
