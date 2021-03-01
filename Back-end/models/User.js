const mongoose = require('mongoose');
const config = require('../configs/app');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      required: true,
      unique: true,
      uniqueCaseInsensitive: false,
      lowercase: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      uniqueCaseInsensitive: false,
      lowercase: true,
    },
    picture: { type: String },
    tenant: { type: String, default: config.audience },
    connection: { type: String, default: 'Username-Password-Authentication' },
    email_verified: { type: Boolean, default: false },
    client_id: { type: String, default: config.client_id },
    password: { type: String, index: true },
  },
  { timestamps: true }
);

schema.methods.toJSON = function () {
  return {
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    username: this.username,
    password: this.password,
    email_verified: this.email_verified,
    email: this.email,
    picture: this.picture,
  };
};

module.exports = mongoose.model('User', schema);
