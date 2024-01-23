const controller = require("../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getCategories(req, res) {
    if (!req.query.userId) {
      return res.status(400).json({ error: 'userId parameter is missing' });
    }
  
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const size = parseInt(req.query.size) || 10; // Default to 10 items per page
    const sort = parseInt(req.query.sort) || -1; // Default to -1 sort
  
    try {
      const [categories, totalCategories] = await Promise.all([
        this.Category
          .find({ userId: req.query.userId })
          .sort({ createdAt: sort }) // Sort by 'createdAt' field in descending order
          .skip((page - 1) * size)
          .limit(size),
        this.Category.countDocuments({ userId: req.query.userId })
      ]);
  
      const response = {
        categories,
        totalCategories,
        currentPage: page,
        totalPages: Math.ceil(totalCategories / size)
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

  async getCategory(req, res) {
    const category = await this.Category.findById(req.params.id);
    res.json(category)
  }

  async createCategory(req, res) {
    const category = await this.Category(_.pick(req.body, ["userId", "categoryName", "type"]))
    await category.save();

    this.response({
      res,
      message: "the category successfuly created",
      data: _.pick(req.body, ["userId", "categoryName", "type"]),
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
      categoryName: req.body.categoryName,
      type: req.body.type,
    })

    await category.save();

    this.response({
      res,
      message: "the category successfuly updated",
      data: _.pick(req.body, ["userId", "categoryName", "type"]),
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
