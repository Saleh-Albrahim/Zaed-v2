const mongoose = require('mongoose');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const OfferSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});





module.exports = mongoose.model('Offers', OfferSchema);
