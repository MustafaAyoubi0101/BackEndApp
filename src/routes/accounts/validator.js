const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('accountName')
        .not()
        .isEmpty()
        .withMessage('Account name is invalid'),
      check('type')
        .not()
        .isEmpty()
        .withMessage('type cant be empty'),
    ]
  }
}