const { check } = require('express-validator');

module.exports = {
  get: [
    check('email')
      .notEmpty()
      .withMessage('is empty')
      .isEmail()
      .withMessage('must be email'),

    check('password')
      .notEmpty()
      .withMessage('is empty')
      .isLength({ min: 8 })
      .withMessage('Please enter a password at least 8 character')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, 'i')
      .withMessage(
        'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. '
      ),
  ],
};
