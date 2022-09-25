const userRepository = require('./userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// 로그인
exports.login = async (body) => {
  const { email, password } = body;

  const existedUser = await userRepository.readUserByEmail(email);
  if (!existedUser) {
    const error = new Error('가입되지 않은 이메일입니다.');
    error.statusCode = 400;
    throw error;
  }

  const isCorrect = await bcrypt.compare(password, existedUser.password);
  if (!isCorrect) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: existedUser.id }, process.env.SECRET_KEY);
  return token;
};
