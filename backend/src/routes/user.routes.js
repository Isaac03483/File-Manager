const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', UserController.findAll)
router.post('/users', UserController.saveUser);
router.put('/users', UserController.updateUser);
router.delete('/users/:username', UserController.deleteUser);

module.exports = router;