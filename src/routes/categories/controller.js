const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getCategories(req, res) {
    const categories = await this.Category.find({ user_id: req.query.userId });
    res.json(categories)
  }

  async getCategory(req, res) {
    const category = await this.Category.findById(req.params.id);
    res.json(category)
  }

  async createCategory(req, res) {
    const category = await this.Account(_.pick(req.body, ["user_id", "name", "type"]))
    await category.save();

    this.response({
      res,
      message: "the category successfuly created",
      data: _.pick(req.body, ["user_id", "name", "type"]),
    })
  }

  async updateCategory(req, res) {
    const category = await this.Category.findById(req.query.id)
    if (!category) {
      this.response({ res })
      return;
    };
    category.set({
      ...req.body,
      name: req.body.name,
      type: req.body.type,
    })

    await category.save();

    this.response({
      res,
      message: "the category successfuly updated",
      data: _.pick(req.body, ["user_id", "name", "type"]),
    })
  }

  async removeCategory(req, res) {
    const result = await this.Category.findByIdAndRemove(req.query.id);

    this.response({
      res,
      message: "the category successfuly removed",
      data: result,
    })
  }

})();
