const express = require('express');
const Listing = require('../models/listing.js');
const ExpressError = require('../ExpressError.js');

const wrapAsync = require('../utils/wrapAsync');

const { listingSchema } = require('../schema.js');
const router = express.Router({ mergeParams: true });

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render('listing/index.ejs', { listings: listings });
  }),
);

router.get('/new', (req, res) => {
  res.render('listing/new.ejs');
});

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    const listing = await Listing.findById({ _id: listingId }).populate(
      'reviews',
    );
    res.render('listing/show.ejs', { listing: listing });
  }),
);

//Create Route
router.post(
  '/',
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

router.get(
  '/:id/edit',
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('listing/edit.ejs', { listing: listing });
  }),
);

router.put(
  '/:id',
  validateListing,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    console.log('==================id: ' + id);
    console.log('==================req.params: ' + req.params);
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

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    await Listing.findByIdAndDelete(listingId);
    res.redirect('/listings');
  }),
);

module.exports = router;
