const { validationResult } = require('express-validator');

// Import Validators
const user = require('./user.validator');
const joke = require('./joke.validator');
const marathon = require('./marathon.validator');

const validators = {
  user,
  joke,
  marathon,
};

module.exports = {
  check(req, res, next) {
    const errors = validationResult(req).array();
    if (errors.length === 0) return next();
    const error = new Error(`${errors[0].param}: ${errors[0].msg}`);
    error.status = 422;
    throw error;
  },
  ...validators,
};
