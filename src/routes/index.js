const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const adminRouter = require('./admin');
const { isLoggined, isAdmin } = require('./../middlewares/auth')
const error = require('./../middlewares/error');
const routerIncome = require('../routes/income')
const routerExpenses = require('../routes/expenses')
const routerSavings = require('../routes/savings')
const routerAccounts = require('../routes/accounts')
const routerCategories = require('../routes/categories')

router.use('/auth', authRouter);

router.use('/user', isLoggined, userRouter);
router.use('/admin', isLoggined, isAdmin, adminRouter);

router.use('/income', isLoggined, routerIncome)
router.use('/expenses', isLoggined, routerExpenses)
router.use('/savings', isLoggined, routerSavings)
router.use('/accounts', isLoggined, routerAccounts)
router.use('/categories', isLoggined, routerCategories)

router.use(error);

module.exports = router;