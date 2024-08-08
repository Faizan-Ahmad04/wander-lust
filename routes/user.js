const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const ExpressError = require('../ExpressError.js');
const wrapAsync = require('../utils/wrapAsync');

router.get('/signup', (req, res) => {
  res.render('users/signup.ejs');
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

module.exports = router;
