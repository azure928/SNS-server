const { body } = require('express-validator');
const validationResultChecker = require('./index');
const errorCodes = require('../codes/errorCodes');

function loginValidator() {
  return [
    body('email')
      .notEmpty()
      .withMessage('이메일은 ' + `${errorCodes.REQUIRED}`)
      .isEmail()
      .withMessage('이메일을 ' + `${errorCodes.WRONGFORMAT}`)
      .normalizeEmail(),
    body('password')
      .trim()
      .notEmpty()
      .bail()
      .withMessage('비밀번호는 ' + `${errorCodes.REQUIRED}`),
    validationResultChecker,
  ];
}

module.exports = { loginValidator };
