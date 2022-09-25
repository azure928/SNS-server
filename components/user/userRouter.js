const express = require('express');
const userController = require('./userController');
const router = express.Router();
const { signUpValidator } = require('../../validator/signUpValidator');
const { loginValidator } = require('../../validator/loginValidator');
const { isAuth } = require('../../middlewares/auth');

// 회원가입
router.post('/user/signup', signUpValidator(), userController.signUp);

// 로그인
router.post('/user/login', loginValidator(), userController.login);

// 인증 미들웨어 테스트
router.get('/authtest', isAuth, (req, res) => {
  console.log('req!!!', req.userId);
  res.status(200).json({ message: '인증 성공' });
});

module.exports = router;
