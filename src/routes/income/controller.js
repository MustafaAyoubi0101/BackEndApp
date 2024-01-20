const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getIncomes(req, res) {
    const incomes = await this.Income.find({account_id: req.query.accountId});
    res.json(incomes)
  }

  async getIncome(req, res) {
    const income = await this.Income.findById(req.params.id);
    res.json(income)
  }

  async createIncome(req, res) {
    const newIncome = await this.Income(_.pick(req.body, ["account_id", "incomeAmount", "category", "paymentMethod", "notes", "date"]))
    await newIncome.save();

    this.response({
      res,
      message: "the income successfuly created",
      data: _.pick(req.body, ["account_id", "incomeAmount", "category", "paymentMethod", "notes", "date"]),
    })
  }

  async updateIncome(req, res) {
    const income = await this.Income.findById(req.query.id)
    if(!income) {
      this.response({res})
      return;
    };
    income.set({
      ...req.body,
      incomeAmount: req.body.incomeAmount,
      category: req.body.category,
      notes: req.body.notes,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date
    })

    await income.save();

    this.response({
      res,
      message: "the income successfuly updated",
      data: _.pick(req.body, ["account_id", "incomeAmount", "category", "paymentMethod", "notes", "date"]),
    })
  }

  async removeIncome(req, res) {
    const result = await this.Income.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the income successfuly removed",
      data: result,
    })
  }

})();
