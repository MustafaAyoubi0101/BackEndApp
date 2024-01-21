const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('paymentMethodName')
        .not()
        .isEmpty()
        .withMessage('Payment method name is invalid'),
    ]
  }
}