const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  savingsValidator() {
    return [
      check('accountId')
        .not()
        .isEmpty()
        .withMessage('account ID amount is required.'),
      check('savingAmount')
        .not()
        .isEmpty()
        .withMessage('Saving amount is required.')
        .isNumeric()
        .withMessage('Saving amount must be a numeric value.'),
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