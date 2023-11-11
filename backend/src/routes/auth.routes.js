const express = require('express');
const User = require('../models/User');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/auth/:username/:password', UserController.findUser);

module.exports = router;