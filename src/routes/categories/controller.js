const controller = require("../controller");
const _ = require("lodash");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getCategories(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const sort = parseInt(req.query.sort) || -1;

    const name = req.query.name;
    const type = req.query.type;

    const searchCondition = {
      userId: req.query.userId,
      ...(name && { categoryName: { $regex: new RegExp(name, 'i') } }),
      ...(type && { type: type })
    };

    await this.handleAsyncOperation(
      res,
      async () => {
        const [data, totalEntity] = await Promise.all([
          this.Category
            .find(searchCondition)
            .sort({ createdAt: sort })
            .skip((page * size))
            .limit(size),
          this.Category.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
          currentPage: page,
          totalPages: Math.ceil(totalEntity / size)
        };
      },
      'Categories fetched successfully',
      'Error fetching categories'
    );
  }

  async getCategory(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Category.findById(req.params.id),
      'Category fetched successfully',
      'Error fetching category'
    );
  }

  async createCategory(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const category = await this.Category(_.pick(req.body, ["userId", "categoryName", "type", "image"]));
        await category.save();
        return _.pick(req.body, ["userId", "categoryName", "type", "image"]);
      },
      'Category created successfully',
      'Error creating category'
    );
  }

  async updateCategory(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const category = await this.Category.findById(req.query.id);
        if (!category) {
          this.response({ res });
          return;
        }

        category.set({
          ...req.body,
          categoryName: req.body.categoryName,
          type: req.body.type,
          image: req.body.image,
        });

        await category.save();
        return _.pick(req.body, ["userId", "categoryName", "type", "image"]);
      },
      'Category updated successfully',
      'Error updating category'
    );
  }

  async removeCategory(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Category.findByIdAndRemove(req.query.id),
      'Category removed successfully',
      'Error removing category'
    );
  }

  async getIncomeCategories(req, res) {
    const searchCondition = {userId: req.query.userId, type: 'INCOME'}

    await this.handleAsyncOperation(
      res,
      async () => {
        const [data, totalEntity] = await Promise.all([
          this.Category.find(searchCondition),
          this.Category.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
        };
      },
      'Income categories fetched successfully',
      'Error fetching income categories'
    );
  }

  async getExpensesCategories(req, res) {
    const searchCondition = {userId: req.query.userId, type: 'EXPENSES'}

    await this.handleAsyncOperation(
      res,
      async () => {
        const [data, totalEntity] = await Promise.all([
          this.Category.find(searchCondition),
          this.Category.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
        };
      },
      'Expenses categories fetched successfully',
      'Error fetching expenses categories'
    );
  }

})();
