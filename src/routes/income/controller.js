const controller = require("../controller");
const _ = require("lodash");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getIncomes(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const sort = parseInt(req.query.sort) || -1;

    const note = req.query.note;

    const searchCondition = {
      accountId: req.query.accountId,
      ...(note && { note: { $regex: new RegExp(note, 'i') } }),
    };

    await this.handleAsyncOperation(
      res,
      async () => {
        const [data, totalEntity] = await Promise.all([
          this.Income
            .find(searchCondition)
            .sort({ createdAt: sort })
            .skip((page * size))
            .limit(size),
          this.Income.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
          currentPage: page,
          totalPages: Math.ceil(totalEntity / size)
        };
      },
      'Income fetched successfully',
      'Error fetching Income'
    );
  }

  async getIncome(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Income.findById(req.params.id),
      'Income fetched successfully',
      'Error fetching income'
    );
  }

  async createIncome(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const income = await this.Income(_.pick(req.body, ["accountId", "incomeAmount", "category", "paymentMethod", "note", "date"]));
        await income.save();
        return _.pick(req.body, ["accountId", "incomeAmount", "category", "paymentMethod", "note", "date"]);
      },
      'Income created successfully',
      'Error creating income'
    );
  }

  async updateIncome(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const income = await this.Income.findById(req.query.id);
        if (!income) {
          this.response({ res });
          return;
        }

        income.set({
          ...req.body,
          incomeAmount: req.body.incomeAmount,
          category: req.body.category,
          note: req.body.note,
          paymentMethod: req.body.paymentMethod,
          date: req.body.date
        });

        await income.save();
        return _.pick(req.body, ["account_id", "incomeAmount", "category", "paymentMethod", "note", "date"]);
      },
      'Income updated successfully',
      'Error updating income'
    );
  }

  async removeIncome(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Income.findByIdAndRemove(req.query.id),
      'Income removed successfully',
      'Error removing income'
    );
  }
})();
