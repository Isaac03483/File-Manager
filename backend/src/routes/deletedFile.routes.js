const express = require('express');
const DeletedFileController = require('../controllers/deletedFile.controller');

const router = express.Router();

router.get('/deleted-files/all', DeletedFileController.findAll);

module.exports = router;