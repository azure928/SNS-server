const { body } = require('express-validator');
const validationResultChecker = require('./index');
const errorCodes = require('../codes/errorCodes');

function signUpValidator() {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('이름은 ' + `${errorCodes.REQUIRED}`)
      .isLength({ min: 2 })
      .withMessage('이름은 ' + `${errorCodes.MINLENGTH(2)}`)
      .isLength({ max: 14 })
      .withMessage('이름은 ' + `${errorCodes.MAXLENGTH(14)}`)
      .not()
      .matches(/[~!@#$%^&*()_+|<>?:{}]/)
      .withMessage('이름은 숫자와 특수문자를 포함할 수 없습니다.'),
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
      .withMessage('비밀번호는 ' + `${errorCodes.REQUIRED}`)
      .isLength({ min: 8, max: 15 })
      .bail()
      .withMessage(errorCodes.WRONGPWD)
      .matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,15}$/)
      .withMessage(errorCodes.WRONGPWD),
    validationResultChecker,
  ];
}

module.exports = { signUpValidator };
