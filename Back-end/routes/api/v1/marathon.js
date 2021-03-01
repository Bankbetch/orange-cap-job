const router = require('express').Router();
const controllers = require('../../../controllers/marathon.controller');
const validator = require('../../../validators/index');

router.post('/step-one', [validator.marathon.getStepOne, validator.check], controllers.createStepOne);
router.put('/step-one/:id', [validator.marathon.getStepOne, validator.check], controllers.updateStepOne);
router.put('/step-two/:id', [validator.marathon.getStepTwo, validator.check], controllers.updateStepTwo);
router.put('/step-three/:id', [validator.marathon.getStepThree, validator.check], controllers.updateStepThree);
router.put('/step-four/:id', [validator.marathon.getStepFour, validator.check], controllers.updateStepFour);
router.put('/step-five/:id', [validator.marathon.getStepFive, validator.check], controllers.updateStepFive);
router.put(
  '/step-submit/:id',
  [validator.marathon.getStepOne, validator.check],
  [validator.marathon.getStepTwo, validator.check],
  [validator.marathon.getStepThree, validator.check],
  [validator.marathon.getStepFour, validator.check],
  [validator.marathon.getStepFive, validator.check],
  controllers.updateStepSubmit
);

module.exports = router;
