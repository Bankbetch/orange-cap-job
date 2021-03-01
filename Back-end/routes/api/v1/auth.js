const router = require('express').Router();
const controllers = require('../../../controllers/auth.controller');
const validator = require('../../../validators/index');

router.post('/sign-up', [validator.user.get, validator.check], controllers.signUp);
module.exports = router;
