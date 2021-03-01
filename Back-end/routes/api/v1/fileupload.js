const router = require('express').Router();
const controllers = require('../../../controllers/fileupload.controller');
router.post('/', controllers.onUpload);
router.delete('/:id', controllers.onDelete);
router.get('/:id', controllers.onGetFile);
module.exports = router;
