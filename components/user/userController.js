const userService = require('./userService');
const logger = require('../../logger');

// 회원가입
exports.signUp = async (req, res, next) => {
  logger.info(`POST ${req.url}`);
  const createdUserId = await userService.signUp(req.body);
  console.log(createdUserId);
  res.status(201).json({ message: '회원가입 성공' });
};
