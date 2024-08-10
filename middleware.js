module.exports.isLoggedIn = (req, res, next) => {
  console.log('================================0', req.isAuthenticated());
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in');
    res.redirect('/users/login');
  }
  return next();
};
