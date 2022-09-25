const userRepository = require('./userRepository');
const bcrypt = require('bcrypt');

// 회원가입
exports.signUp = async (body) => {
  const { email, name, password } = body;

  const existedUser = await userRepository.readUserByEmail(email);
  if (existedUser) {
    const error = new Error('이미 사용중인 이메일입니다.');
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const createdUser = await userRepository.createUser(email, name, hash);

  const createdUserId = {
    userId: createdUser.id,
  };
  return createdUserId;
};
