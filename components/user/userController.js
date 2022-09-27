const userService = require('./userService');
const logger = require('../../logger');

// 회원가입
exports.signUp = async (req, res, next) => {
  logger.info(`POST ${req.url}`);
  const createdUserId = await userService.signUp(req.body);
  console.log(createdUserId);
  res.status(201).json({ message: '회원가입 성공' });
};

// 로그인
/*
exports.login = async (req, res, next) => {
  logger.info(`POST ${req.url}`);
  const token = await userService.login(req.body);
  res.status(200).json({ message: '로그인 성공', token });
};*/

exports.login = async (req, res, next) => {
  const data = await userService.login(req.body);
  res.status(200).json({ message: '로그인 성공', data });
};
