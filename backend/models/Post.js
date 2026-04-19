// backend/models/Post.js
// A post belongs to one User (author). { ref: 'User' } lets us call
// .populate('author') to replace the ObjectId with the user's name + pic.

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '', // filename stored in backend/uploads/
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['published', 'removed'],
      default: 'published',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
