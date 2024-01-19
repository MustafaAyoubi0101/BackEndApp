const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getSavings
)

router.get(
    '/:id',
    controller.getSaving
)

router.post(
    '/',
    validator.savingsValidator(),
    controller.validate,
    controller.createSavings
)

router.put(
    '/',
    validator.savingsValidator(),
    controller.validate,
    controller.updateSaving
)

router.delete(
    '/',
    controller.removeSaving
)

module.exports = router;