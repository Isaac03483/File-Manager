const express = require('express');
const FileController = require('../controllers/file.controller');

const router = express.Router();

router.get('/files/:username', FileController.findUserFiles);
router.get('/files/find/:username/:name', FileController.findFileByName);
router.post('/files', FileController.saveFile);
router.put('/files', FileController.updateFile);

module.exports = router;