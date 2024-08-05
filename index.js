const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./ExpressError');
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');

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

app.get('/', (req, res) => {
  res.send("hi I'm root!");
});

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

app.get(
  '/listings',
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render('listing/index.ejs', { listings: listings });
  }),
);

app.get('/listings/new', (req, res) => {
  res.render('listing/new.ejs');
});

app.get(
  '/listings/:id',
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    const listing = await Listing.findById({ _id: listingId }).populate(
      'reviews',
    );
    res.render('listing/show.ejs', { listing: listing });
  }),
);

//Create Route
app.post(
  '/listings',
  validateListing,
  wrapAsync(async (req, res, next) => {
    if (!req.body.listing) {
      next(new ExpressError(400, 'send valid data for listings'));
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  }),
);

app.get(
  '/listings/:id/edit',
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listing/edit.ejs', { listing: listing });
  }),
);

app.put(
  '/listings/:id',
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      req.body.listing,
      {
        new: true,
      },
    );
    console.log('updatedListing: ', updatedListing);
    res.redirect(`/listings/${id}`);
  }),
);

app.delete(
  '/listings/:id',
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    await Listing.findByIdAndDelete(listingId);
    res.redirect('/listings');
  }),
);

app.post(
  '/listings/:id/reviews',
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById({ _id: req.params.id });
    console.log('reviews updated', listing);
    const newReview = new Review(req.body.review);
    console.log('reviews', newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.send('reviews updated');
  }),
);

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
