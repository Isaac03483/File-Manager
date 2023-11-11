const express = require('express');
const DirectoryController = require('../controllers/directory.controller');

const router = express.Router();

router.get('/directories/:username', DirectoryController.findUserDirectories);
router.post('/directories', DirectoryController.createDirectory);
router.get('/directories/move/:username/:name', DirectoryController.findAllWithout);
router.put('/directories', DirectoryController.moveDirectory);
router.delete('/directories/:username/:name', DirectoryController.deleteDirectory);
router.post('/directories/copy', DirectoryController.copyDirectory);

module.exports = router;