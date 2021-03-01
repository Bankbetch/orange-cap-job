const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    joke: { type: String, required: true },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Joke', schema);
