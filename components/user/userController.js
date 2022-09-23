const userService = require('./userService');

// 유저 생성
exports.createUser = async (req, res, next) => {
  const createdUserId = await userService.createUser();
  res.status(201).json(createdUserId);
};
