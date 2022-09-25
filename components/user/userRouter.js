const express = require('express');
const userController = require('./userController');
const router = express.Router();
const { signUpValidator } = require('../../validator/signUpValidator');
const { loginValidator } = require('../../validator/loginValidator');

// 회원가입
router.post('/user/signup', signUpValidator(), userController.signUp);

// 로그인
router.post('/user/login', loginValidator(), userController.login);

module.exports = router;
