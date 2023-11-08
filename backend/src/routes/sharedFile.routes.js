const express = require('express');

const SharedFileController = require('../controllers/sharedFile.controller');
const router = express.Router();


router.get('/shared-files/:username', SharedFileController.findUserSharedFiles);
router.post('/shared-files', SharedFileController.shareFileTo);

module.exports = router;