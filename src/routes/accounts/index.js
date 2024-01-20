const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getAccounts
)

router.get(
    '/:id',
    controller.getAccount
)

router.post(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.createAccount
)

router.put(
    '/',
    validator.incomeValidator(),
    controller.validate,
    controller.updateAccount
)

router.delete(
    '/',
    controller.removeAccount
)

module.exports = router;