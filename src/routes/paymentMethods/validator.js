const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Name is invalid'),
    ]
  }
}