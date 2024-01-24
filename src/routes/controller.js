const autoBind = require("auto-bind");
const {validationResult} = require('express-validator');
const User = require('./../models/user');
const Income = require('../models/income');
const Expenses = require('../models/expenses');
const Savings = require('../models/savings');
const Account = require('../models/account');
const Category = require('../models/category');
const PaymentMethod = require('../models/paymentMethod');

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Income = Income;
    this.Expenses = Expenses;
    this.Savings = Savings;
    this.Account = Account;
    this.Category = Category;
    this.PaymentMethod = PaymentMethod;
  }

  handleError(res, error, message = 'Internal server error') {
    console.error(message, error);
    res.status(500).json({ error: message });
  }

  async handleAsyncOperation(res, operation, successMessage = 'Success', errorMessage = 'Error') {
    try {
      const result = await operation();
      this.response({ res, message: successMessage, data: result });
    } catch (error) {
      this.handleError(res, error, errorMessage);
    }
  }

  validationBody(req,res){
    const result = validationResult(req);
    if(!result.isEmpty()){
      const errors = result.array();
      const messages = [];
      errors.forEach(err => messages.push(err.msg));
      res.status(400).json({
        message: 'validation error',
        data: messages
      })
      return false;
    }
    return true;
  }

  validate(req,res,next){
    if(!this.validationBody(req,res)){
      return;
    }
    next();
  }

  response({res, message, code=200, data={}}){
    res.status(code).json({
      message,
      data
    });
  }

}; 
