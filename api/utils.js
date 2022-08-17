function requireAdmin(req, res, next) {
  console.log("This is the req user thing", req.user);
  if (!req.user.isAdmin) {
    next({
      name: "UserIsNotAdmin",
      message: "You must be an admin to be able to do this.",
    });
  }
  next();
}

module.exports = {
  requireAdmin,
};
