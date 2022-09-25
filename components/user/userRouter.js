const express = require('express');
const userController = require('./userController');
const router = express.Router();

// 회원가입
router.post('/user', userController.signUp);

module.exports = router;
