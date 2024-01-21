const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getAccounts(req, res) {
    const accounts = await this.Account.find({userId: req.query.userId});
    res.json(accounts)
  }

  async getAccount(req, res) {
    const account = await this.Account.findById(req.params.id);
    res.json(account)
  }

  async createAccount(req, res) {
    const account = await this.Account(_.pick(req.body, ["userId", "accountName"]))
    await account.save();

    this.response({
      res,
      message: "the account successfuly created",
      data: _.pick(req.body, ["userId", "incomeAmount"]),
    })
  }

  async updateAccount(req, res) {
    const account = await this.Account.findById(req.query.id)
    if(!account) {
      this.response({res})
      return;
    };
    account.set({
      ...req.body,
      accountName: req.body.accountName,
      type: req.body.type,
    })

    await account.save();

    this.response({
      res,
      message: "the account successfuly updated",
      data: _.pick(req.body, ["userId", "accountName"]),
    })
  }

  async removeAccount(req, res) {
    const result = await this.Account.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the account successfuly removed",
      data: result,
    })
  }

})();
