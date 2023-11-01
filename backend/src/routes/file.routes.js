const express = require('express');
const FileController = require('../controllers/file.controller');

const router = express.Router();

router.get('/files/:username', FileController.findUserFiles);

module.exports = router;