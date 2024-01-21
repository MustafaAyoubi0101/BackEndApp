const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getSavings(req, res) {
    const savings = await this.Savings.find({account_id: req.query.accountId});
    res.json(savings)
  }

  async getSaving(req, res) {
    const saving = await this.Savings.findById(req.params.id);
    res.json(saving)
  }

  async createSavings(req, res) {
    const savings = await this.Savings(_.pick(req.body, ["account_id", "savingAmount", "paymentMethod", "notes", "date"]))
    await savings.save();

    this.response({
      res,
      message: "the saving successfuly created",
      data: _.pick(req.body, ["account_id", "savingAmount", "paymentMethod", "notes", "date"]),
    })
  }

  async updateSaving(req, res) {
    const saving = await this.Savings.findById(req.query.id)
    if(!saving) {
      this.response({res})
      return;
    };
    saving.set({
      ...req.body,
      savingAmount: req.body.savingAmount,
      notes: req.body.notes,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date
    })

    await expenses.save();

    this.response({
      res,
      message: "the saving successfuly updated",
      data: _.pick(req.body, ["account_id", "savingAmount", "paymentMethod", "notes", "date"]),
    })
  }

  async removeSaving(req, res) {
    const result = await this.Savings.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the saving successfuly removed",
      data: result,
    })
  }

})();
