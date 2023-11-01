const express = require('express');
const DirectoryController = require('../controllers/directory.controller');

const router = express.Router();

router.get('/directories/:username', DirectoryController.findUserDirectories);
router.post('/directories', DirectoryController.createDirectory);

module.exports = router;