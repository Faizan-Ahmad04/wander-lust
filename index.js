const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./ExpressError');
const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/review.js');
const userRoutes = require('./routes/user.js');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/wanderlust')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error while connecting to MongoDB', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());

const sessionOptions = {
  secret: 'mysupersecretcodetoken',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 6,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.errorMsg = req.flash('error');
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);
app.use('/users', userRoutes);

app.get('/demouser', async (req, res) => {
  let fakeUser = new User({
    email: 'test@example.com',
    username: 'test_user',
  });
  const user = await User.register(fakeUser, 'password');
  res.send(user);
});
//Error handling
app.all('*', (re, res, next) => {
  return next(new ExpressError(404, 'Page not found'));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Somting went wrong' } = err;
  // res.status(statusCode).send(message);
  res.render('error.ejs', { message });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
