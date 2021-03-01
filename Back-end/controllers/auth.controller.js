const bcrypt = require('bcrypt');
const User = require('../models/User');
const { errorHandle, successHandle, errorMongo } = require('../helpers/index');

const methods = {
  signUp(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.error(errorHandle(err, 401));
      }
      try {
        const user = new User({
          email: req.body.email,
          password: hash,
          username: req.body.username || req.body.email,
          picture: `https://avatars.dicebear.com/4.5/api/initials/${req.body.email
            .substring(0, 1)
            .toUpperCase()}.svg?radius=50&width=40&height=40&chars=1`,
          email_verified: true,
        });
        user.save((userError) => {
          if (userError) res.error(errorHandle(errorMongo(userError), 400));
          else res.success(successHandle());
        });
      } catch (error) {
        res.error(errorHandle(error.message));
      }
    });
  },
};

module.exports = { ...methods };
