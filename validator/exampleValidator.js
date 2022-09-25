const { body, query, param } = require('express-validator');
const validationResultChecker = require('./index');

function exampleValidator() {
  return [
    body('name').trim().isLength({ min: 2 }).withMessage('이름은 두글자 이상'),
    body('age').isInt().withMessage('숫자를 입력해요'),
    body('email').isEmail().withMessage('이메일 입력해요').normalizeEmail(),
    validationResultChecker,
  ];
}

function exampleValidator2() {
  return [param('email').isEmail().withMessage('이메일 입력해요'), index];
}

module.exports = {
  exampleValidator,
  exampleValidator2,
};
