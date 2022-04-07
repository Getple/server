const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  nickname: {
    type: String,
    required: true,
  },
  thumbnail_image_url: {
    type: String,
  },
  profile_image_url: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 9 * 60 * 60 * 1000,
  },
});

module.exports = mongoose.model('User', userSchema);
