const userRepository = require('./userRepository');

// 유저 생성
exports.createUser = async () => {
  const createdUser = await userRepository.createUser();

  const createdUserId = {
    userId: createdUser.id,
  };
  return createdUserId;
  //throw new Error('BROKEN');
};
