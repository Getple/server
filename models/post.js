const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  personnel: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 9 * 60 * 60 * 1000,
  },
});

module.exports = mongoose.model('Post', postSchema);
