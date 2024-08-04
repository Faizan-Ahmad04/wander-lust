const Jio = require('joi');

module.exports.listingSchema = Jio.object({
  listing: Jio.object({
    title: Jio.string().required(),
    description: Jio.string().required(),
    location: Jio.string().required(),
    price: Jio.string().required().min(0),
    countroy: Jio.string().required(),
    image: Jio.string().allow('', null),
  }),
});
