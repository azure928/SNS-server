const db = require('../../database/models/index');
const User = db.user;

/**
 * 기능: user 생성 (중복되지 않는 user id 생성)
 */
exports.createUser = async () => {
  return await User.create({});
};
