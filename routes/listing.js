const express = require('express');
const Listing = require('../models/listing.js');
const ExpressError = require('../ExpressError.js');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn } = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

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

router.get('/new', isLoggedIn, (req, res) => {
  res.render('listing/new.ejs');
});

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    const listing = await Listing.findById({ _id: listingId }).populate(
      'reviews',
    );
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    return res.render('listing/show.ejs', { listing: listing });
  }),
);

//Create Route
router.post(
  '/',
  isLoggedIn,
  upload.single('listing[image]'),
  wrapAsync(async (req, res, next) => {
    const url = req.file.path;
    const filename = req.file.filename;
    console.log(url, '---------', filename);
    if (!req.body.listing) {
      return next(new ExpressError(400, 'send valid data for listings'));
    }
    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'New listings created');
    return res.redirect('/listings');
  }),
);

router.get(
  '/:id/edit',
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }
    return res.render('listing/edit.ejs', { listing: listing });
  }),
);

router.put(
  '/:id',
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      req.body.listing,
      {
        new: true,
      },
    );
    req.flash('success', 'Listing updated successfully');
    return res.redirect(`/listings/${id}`);
  }),
);

router.delete(
  '/:id',
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const listingId = req.params.id;
    await Listing.findByIdAndDelete(listingId);
    req.flash('success', 'Listing deleted successfully');
    return res.redirect('/listings');
  }),
);

module.exports = router;
