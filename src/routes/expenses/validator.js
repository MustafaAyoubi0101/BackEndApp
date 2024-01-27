const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  expensesValidator() {
    return [
      check('accountId')
        .not()
        .isEmpty()
        .withMessage('account ID amount is required.'),
      check('expensesAmount')
        .not()
        .isEmpty()
        .withMessage('Expenses amount is required.')
        .isNumeric()
        .withMessage('Expenses amount must be a numeric value.'),
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
        .withMessage('Date is required.'),
    ]
  }
}