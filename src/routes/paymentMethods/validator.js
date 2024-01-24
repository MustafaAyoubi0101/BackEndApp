const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  paymentMethodValidator() {
    return [
      check('paymentMethodName')
        .not()
        .isEmpty()
        .withMessage('Payment method name is invalid'),
    ]
  }
}