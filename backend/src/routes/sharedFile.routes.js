const express = require('express');

const SharedFileController = require('../controllers/sharedFile.controller');
const router = express.Router();


router.get('/shared-files/:username', SharedFileController.findUserSharedFiles);
router.post('/shared-files', SharedFileController.shareFileTo);
router.get('/shared-files/find/:username/:name', SharedFileController.findSharedFile);
router.put('/shared-files', SharedFileController.updateSharedFile);
router.delete('/shared-files/:username/:name', SharedFileController.deleteSharedFile);
module.exports = router;