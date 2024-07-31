const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');

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

app.get('/listings', async (req, res) => {
  const listings = await Listing.find({});
  console.log('==============================', listings);
  res.render('listing/index.ejs', { listings: listings });
});

app.get('/listings/new', (req, res) => {
  res.render('listing/new.ejs');
});

app.get('/listings/:id', async (req, res) => {
  const listingId = req.params.id;
  const listing = await Listing.findById({ _id: listingId });
  console.log('==============================', listing);
  res.render('listing/show.ejs', { listing: listing });
});

//Create Route
app.post('/listings', async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/listings');
});

app.get('/listings/:id/edit', async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render('listing/edit.ejs', { listing: listing });
});

app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });
  console.log('updatedListing: ', updatedListing);
  res.redirect(`/listings/${id}`);
});

app.delete('/listings/:id', async (req, res) => {
  console.log('=====================', req.params.id);
  const listingId = req.params.id;
  await Listing.findByIdAndDelete(listingId);
  res.redirect('/listings');
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
