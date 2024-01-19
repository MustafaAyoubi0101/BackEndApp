const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getIncomes
)

router.get(
    '/:id',
    controller.getIncome
)

router.post(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.createIncome
)

router.put(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.updateIncome
)

router.delete(
    '/',
    controller.removeIncome
)

module.exports = router;