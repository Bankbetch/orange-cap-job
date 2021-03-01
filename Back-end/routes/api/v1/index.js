const router = require('express').Router();
const { checkJwt } = require('../../../configs/jwks');

router.use('/auth', require('./auth'));
router.use('/jokes', checkJwt, require('./joke'));
router.use('/marathon', checkJwt, require('./marathon'));
router.use('/upload', checkJwt, require('./fileupload'));

module.exports = router;
