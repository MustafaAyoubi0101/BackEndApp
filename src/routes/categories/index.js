const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get(
    '/',
    controller.getCategories
)

router.get(
    '/:id',
    controller.getCategory
)

router.post(
    '/',
    validator.categoryValidator(),
    controller.validate,
    controller.createCategory
)

router.put(
    '/',
    validator.categoryValidator(),
    controller.validate,
    controller.updateCategory
)

router.delete(
    '/',
    controller.removeCategory
)

module.exports = router;