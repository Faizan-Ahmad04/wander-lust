const joi = require('joi');

module.exports.listingSchema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      location: joi.string().required(),
      price: joi.string().required().min(0),
      countroy: joi.string().required(),
      image: joi.string().allow('', null),
    })
    .required(),
});

module.exports.reviewSchema = joi.object({
  review: joi
    .object({
      rating: joi.number().required(),
      comment: joi.string().required(),
    })
    .required(),
});
