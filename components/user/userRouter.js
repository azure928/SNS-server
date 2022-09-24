const express = require('express');
const userController = require('./userController');
const router = express.Router();

router.post('/users', userController.createUser);

module.exports = router;
