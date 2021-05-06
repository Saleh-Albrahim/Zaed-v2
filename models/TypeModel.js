const mongoose = require('mongoose');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const TypeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
    required: true
  },
  Name: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('types', TypeSchema);
