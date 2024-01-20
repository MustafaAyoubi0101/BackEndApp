const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getPaymentMethods(req, res) {
    const paymentMethods = await this.PaymentMethod.find({ user_id: req.query.userId });
    res.json(paymentMethods)
  }

  async getPaymentMethod(req, res) {
    const paymentMethod = await this.PaymentMethod.findById(req.params.id);
    res.json(paymentMethod)
  }

  async createPaymentMethod(req, res) {
    const paymentMethod = await this.Account(_.pick(req.body, ["user_id", "name"]))
    await paymentMethod.save();

    this.response({
      res,
      message: "the payment method successfuly created",
      data: _.pick(req.body, ["user_id", "name"]),
    })
  }

  async updatePaymentMethod(req, res) {
    const paymentMethod = await this.PaymentMethod.findById(req.query.id)
    if (!paymentMethod) {
      this.response({ res })
      return;
    };
    paymentMethod.set({
      ...req.body,
      name: req.body.name,
    })

    await paymentMethod.save();

    this.response({
      res,
      message: "the payment method successfuly updated",
      data: _.pick(req.body, ["user_id", "name"]),
    })
  }

  async removePaymentMethod(req, res) {
    const result = await this.PaymentMethod.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the payment method successfuly removed",
      data: result,
    })
  }

})();
