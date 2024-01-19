const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  savingsValidator() {
    return [
      check('savingAmount')
        .not()
        .isEmpty()
        .withMessage('saving amount is invalid'),
      check('savingMethod')
        .not()
        .isEmpty()
        .withMessage('Saving method cant be empty'),
      check('date')
        .not()
        .isEmpty()
        .withMessage('date cant be empty'),
    ]
  }
}