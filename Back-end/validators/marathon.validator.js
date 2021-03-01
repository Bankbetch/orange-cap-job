const { check, checkSchema } = require('express-validator');
const schemaPrefix = {
  prefix_name: {
    in: 'body',
    matches: {
      options: [/\b(?:นาย|นาง|นางสาว|MR|MISS|MS)\b/],
      errorMessage: 'Invalid Prefix Name',
    },
  },
};
const schemaBlood = {
  blood_type: {
    in: 'body',
    matches: {
      options: [/\b(?:A|B|O|AB)\b/],
      errorMessage: 'Invalid Blood type',
    },
  },
};
const schemaExericise = {
  exercise: {
    in: 'body',
    matches: {
      options: [/\b(?:1-2|3-5|all)\b/],
      errorMessage: 'Invalid Exercise type',
    },
  },
};
const schemaShirt = {
  t_shirt_size: {
    in: 'body',
    matches: {
      options: [/\b(?:XS|S|M|L|XL|XXL|XXXL)\b/],
      errorMessage: 'Invalid T-Shirt size',
    },
  },
};
module.exports = {
  getStepOne: [
    check('prefix_name').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    checkSchema(schemaPrefix),
    check('first_name').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('last_name').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('date_of_birth').notEmpty().withMessage('is empty').isDate({ format: 'YYYY-MM-DD' }).withMessage('must be format YYYY-MM-DD'),
    check('email').notEmpty().withMessage('is empty').isString().withMessage('must be string').isEmail().withMessage('must be email'),
    check('tax_id').notEmpty().withMessage('is empty').isString().withMessage('must be string').isLength({ max: 13, min: 13 }),
    check('address').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('phone_number').notEmpty().withMessage('is empty').isString().withMessage('must be string').isLength({ max: 10, min: 10 }),
    check('image').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('image').notEmpty().withMessage('is empty'),
    check('BIB').notEmpty().withMessage('is empty').isString().withMessage('must be string').isLength({ max: 10 }).isAlphanumeric('en-US'),
  ],
  getStepTwo: [
    check('applicant_background_runner').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('applicant_background_runner_time')
      .notEmpty()
      .withMessage('is empty')
      .isString()
      .withMessage('must be string')
      .matches('^([0-9]?[0-9]):[0-9][0-9]$'),
  ],
  getStepThree: [
    check('emergency_contact')
      .notEmpty()
      .withMessage('is empty')
      .isArray()
      .withMessage('must be array')
      .custom((value) => {
        let flag = true;
        if (Array.isArray(value)) {
          for (const items of value) {
            if (!items.first_name || !items.last_name || !items.relationship || !items.phone_number || items.phone_number.length !== 10) {
              flag = false;
            }
          }
          return flag ? value : null;
        }
      }),
  ],
  getStepFour: [
    check('blood_type').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    checkSchema(schemaBlood),
    check('chronic_health').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('surgery_before').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('plan_baby').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('medicine_to_take').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('injured_from_marathon').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    check('exercise').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
    checkSchema(schemaExericise),
    check('sick').notEmpty().withMessage('is empty').isString().withMessage('must be string'),
  ],
  getStepFive: [check('t_shirt_size').notEmpty().withMessage('is empty').isString().withMessage('must be string'), checkSchema(schemaShirt)],
};
// .isBase64().withMessage('must be Base64')
