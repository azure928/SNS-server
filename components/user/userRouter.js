const express = require('express');
const userController = require('./userController');
const router = express.Router();
const { signUpValidator } = require('../../validator/signUpValidator');
const { loginValidator } = require('../../validator/loginValidator');
const { isAuth } = require('../../middlewares/auth');
const { refresh } = require('./refresh');

// 회원가입
router.post('/users/signup', signUpValidator(), userController.signUp);

// 로그인
router.post('/users/login', loginValidator(), userController.login);

// Access token 재발급
router.post('/users/refresh', refresh);

// 인증 미들웨어 테스트용
router.get('/users/authtest', isAuth, (req, res) => {
  console.log('req!!!', req.userId);
  res.status(200).json({ message: '인증 성공' });
});

module.exports = router;
