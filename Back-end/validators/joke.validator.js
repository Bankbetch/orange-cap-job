const { check } = require('express-validator');

module.exports = {
  get: [check('joke').notEmpty().withMessage('is empty').isString().withMessage('must be string')],
};
