const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
  incomeValidator() {
    return [
      check('categoryName')
        .not()
        .isEmpty()
        .withMessage('Category name is invalid'),
      check('type')
        .not()
        .isEmpty()
        .withMessage('Type is invalid'),
    ]
  }
}