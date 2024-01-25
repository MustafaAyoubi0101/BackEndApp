const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('accountId')
        .not()
        .isEmpty()
        .withMessage('account ID amount is required.'),
      check('incomeAmount')
        .not()
        .isEmpty()
        .withMessage('Income amount is required.')
        .isNumeric()
        .withMessage('Income amount must be a numeric value.'),
      check('category')
        .not()
        .isEmpty()
        .withMessage('category amount is required.'),
      check('paymentMethod')
        .not()
        .isEmpty()
        .withMessage('Payment method amount is required.'),
      check('date')
        .not()
        .isEmpty()
        .withMessage('date amount is required.'),
    ]
  }
}