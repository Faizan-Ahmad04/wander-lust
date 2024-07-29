const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-photo/vintage-twilight-pool-nature-light_1203-5731.jpg?t=st=1722275381~exp=1722278981~hmac=a0d204f26ae31cec879db18e03a727a81d6cf75f15499c6e92ffeca685f50982&w=996",
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
    }
});

const Listing = mongoose.nodel("Listing", listingSchema);

module.exports = Listing;