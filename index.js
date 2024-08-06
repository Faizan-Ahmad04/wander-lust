const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./ExpressError');
const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/review.js');
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

app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);

//Error handling
app.all('*', (re, res, next) => {
  next(new ExpressError(404, 'Page not found'));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Somting went wrong' } = err;
  // res.status(statusCode).send(message);
  res.render('error.ejs', { message });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
