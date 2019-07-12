const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 200
  },
  desc: {
    type: String,
    required: true,
    min: 1,
    max: 500
  },
  bodycontent: {
    type: String,
    required: true,
    min: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
