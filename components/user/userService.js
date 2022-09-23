const userRepository = require('./userRepository');

// 유저 생성

exports.createUser = async () => {
  const createdUser = await userRepository.createUser();

  const createdUserId = {
    userId: createdUser.id,
  };
  return createdUserId;

  /*
  const error = new Error('BROKEN');
  error.statusCode = 400;
  throw error;*/
};
