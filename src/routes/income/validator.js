const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('accountId')
        .not()
        .isEmpty()
        .withMessage('account id cant be empty'),
      check('incomeAmount')
        .not()
        .isEmpty()
        .withMessage('Income amount is invalid'),
      check('category')
        .not()
        .isEmpty()
        .withMessage('category cant be empty'),
      check('paymentMethod')
        .not()
        .isEmpty()
        .withMessage('Payment method cant be empty'),
      check('date')
        .not()
        .isEmpty()
        .withMessage('date cant be empty'),
    ]
  }
}