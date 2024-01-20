const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getExpenses(req, res) {
    const expenses = await this.Expenses.find({account_id: req.query.accountId});
    res.json(expenses)
  }

  async getExpense(req, res) {
    const income = await this.Expenses.findById(req.params.id);
    res.json(income)
  }

  async createExpenses(req, res) {
    const expenses = await this.Expenses(_.pick(req.body, ["account_id", "expensesAmount", "category", "paymentMethod", "notes", "date"]))
    await expenses.save();

    this.response({
      res,
      message: "the expenses successfuly created",
      data: _.pick(req.body, ["account_id", "expensesAmount", "category", "paymentMethod", "notes", "date"]),
    })
  }

  async updateExpenses(req, res) {
    const expenses = await this.Expenses.findById(req.query.id)
    if(!expenses) {
      this.response({res})
      return;
    };
    expenses.set({
      ...req.body,
      expensesAmount: req.body.expensesAmount,
      category: req.body.category,
      notes: req.body.notes,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date
    })

    await expenses.save();

    this.response({
      res,
      message: "the expenses successfuly updated",
      data: _.pick(req.body, ["account_id", "expensesAmount", "category", "paymentMethod", "notes", "date"]),
    })
  }

  async removeExpenses(req, res) {
    const result = await this.Expenses.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the expenses successfuly removed",
      data: result,
    })
  }

})();
