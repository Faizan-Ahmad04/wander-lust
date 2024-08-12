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
  wrapAsync(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash('success', 'Registration successful! You are now logged in');
        res.redirect('/listings');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/users/signup');
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
  (req, res) => {
    console.log('Logged in user:', req.user);
  },
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully');
    res.redirect('/listings');
  });
});

module.exports = router;
