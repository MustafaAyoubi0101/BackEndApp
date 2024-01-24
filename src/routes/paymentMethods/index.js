const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getPaymentMethods
)

router.get(
    '/:id',
    controller.getPaymentMethod
)

router.post(
    '/',
    validator.paymentMethodValidator(),
    controller.validate,
    controller.createPaymentMethod
)

router.put(
    '/',
    validator.paymentMethodValidator(),
    controller.validate,
    controller.updatePaymentMethod
)

router.delete(
    '/',
    controller.removePaymentMethod
)

module.exports = router;