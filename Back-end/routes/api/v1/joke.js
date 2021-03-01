const router = require('express').Router();
const controllers = require('../../../controllers/joke.controller');
const validator = require('../../../validators/index');

router.get('/', controllers.findAll);
router.get('/:id', controllers.findById);
router.post('/', [validator.joke.get, validator.check], controllers.create);
router.put('/:id/like', controllers.like);
router.put('/:id/dislike', controllers.dislike);
router.delete('/:id', controllers.destroy);
module.exports = router;
