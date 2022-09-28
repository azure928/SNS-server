const { body } = require('express-validator');
const validationResultChecker = require('./index');
const errorCodes = require('../codes/errorCodes');

function postValidator() {
  return [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('제목은 ' + `${errorCodes.REQUIRED}`)
      .isLength({ max: 30 })
      .withMessage('제목은 ' + `${errorCodes.MAXLENGTH(30)}`),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('내용은 ' + `${errorCodes.REQUIRED}`)
      .isLength({ max: 200 })
      .withMessage('내용은 ' + `${errorCodes.MAXLENGTH(200)}`),
    validationResultChecker,
  ];
}

module.exports = { postValidator };
