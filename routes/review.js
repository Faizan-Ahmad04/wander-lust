const express = require('express');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const ExpressError = require('../ExpressError.js');

const wrapAsync = require('../utils/wrapAsync');

const { reviewSchema } = require('../schema.js');
const router = express.Router({ mergeParams: true });

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

router.post(
  '/',
  validateReview,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById({ _id: req.params.id });
    console.log('reviews updated', listing);
    const newReview = new Review(req.body.review);
    console.log('reviews', newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash('success', 'New review created');
    res.redirect(`/listings/${listing._id}`);
  }),
);

router.delete(
  '/:reviewId',
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully');
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
