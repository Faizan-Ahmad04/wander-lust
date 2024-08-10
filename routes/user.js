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
      let { username, email, password } = req.body;
      let newUSer = new User({ username, email });
      const registerUser = await User.register(newUSer, password);
      console.log(registerUser);
      req.flash('success', 'Registration successful! You can now log in');
      res.redirect('/listings');
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
  async (req, res) => {
    res.redirect('/listings');
  },
);

router.get('/users/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash('success', 'Logged out successfully');
    res.redirect('/listings');
  });
});

module.exports = router;
