const userService = require('./userService');
const logger = require('../../logger');

// 유저 생성
exports.createUser = async (req, res, next) => {
  logger.info(`POST ${req.url}`);
  const createdUserId = await userService.createUser();
  res.status(201).json(createdUserId);
};
