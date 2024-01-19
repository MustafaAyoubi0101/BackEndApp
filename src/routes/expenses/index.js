const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getExpenses
)

router.get(
    '/:id',
    controller.getExpense
)

router.post(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.createExpenses
)

router.put(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.updateExpenses
)

router.delete(
    '/',
    controller.removeExpenses
)

module.exports = router;