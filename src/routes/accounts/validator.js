const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('accountName')
        .not()
        .isEmpty()
        .withMessage('Account name is invalid'),
    ]
  }
}