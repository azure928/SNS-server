const db = require('../../database/models/index');
const User = db.user;

/**
 * 기능: email로 user 조회 (존재하는 email인지 확인)
 */
exports.readUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

/**
 * 기능: id로 user 조회
 */
exports.readUserById = async (id) => {
  return await User.findOne({
    where: {
      id: id,
    },
  });
};

/**
 * 기능: user 생성 (중복되지 않는 user id 생성)
 */
exports.createUser = async (email, name, hash) => {
  return await User.create({
    email: email,
    name: name,
    password: hash,
  });
};
