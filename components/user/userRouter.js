const express = require('express');
const userController = require('./userController');
const router = express.Router();
const { signUpValidator } = require('../../validator/signUpValidator');

// 회원가입
router.post('/user', signUpValidator(), userController.signUp);

module.exports = router;
