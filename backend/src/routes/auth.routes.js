const express = require('express');
const User = require('../models/User');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/auth', UserController.findUser);

module.exports = router;