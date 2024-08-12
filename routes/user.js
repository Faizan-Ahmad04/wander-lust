const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
});

router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});

router.post(
  '/signup',
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash('success', 'Registration successful! You can now log in');
        return res.redirect('/listings');
      });
    } catch (e) {
      req.flash('error', e.message);
      return res.redirect('/users/signup');
    }
  }),
);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/listings',
    failureFlash: true,
  }),
  async (req, res) => {
    return res.redirect('/listings');
  },
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully');
    return res.redirect('/listings');
  });
});

module.exports = router;
