const controller = require("../controller");
const _ = require("lodash");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getExpenses(req, res) {
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
          this.Expenses
            .find(searchCondition)
            .sort({ createdAt: sort })
            .skip((page * size))
            .limit(size),
          this.Expenses.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
          currentPage: page,
          totalPages: Math.ceil(totalEntity / size)
        };
      },
      'Expenses fetched successfully',
      'Error fetching Expenses'
    );
  }

  async getExpense(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Expenses.findById(req.params.id),
      'Expense fetched successfully',
      'Error fetching Expense'
    );
  }

  async createExpenses(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const expenses = await this.Expenses(_.pick(req.body, ["accountId", "expensesAmount", "category", "paymentMethod", "note", "date"]));
        await expenses.save();
        return _.pick(req.body, ["accountId", "expensesAmount", "category", "paymentMethod", "note", "date"]);
      },
      'Expenses created successfully',
      'Error creating expenses'
    );
  }

  async updateExpenses(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const expenses = await this.Expenses.findById(req.query.id);
        if (!expenses) {
          this.response({ res });
          return;
        }

        expenses.set({
          ...req.body,
          expensesAmount: req.body.expensesAmount,
          category: req.body.category,
          note: req.body.note,
          paymentMethod: req.body.paymentMethod,
          date: req.body.date
        });

        await expenses.save();
        return _.pick(req.body, ["account_id", "expensesAmount", "category", "paymentMethod", "note", "date"]);
      },
      'Expenses updated successfully',
      'Error updating expenses'
    );
  }

  async removeExpenses(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Expenses.findByIdAndRemove(req.query.id),
      'Expenses removed successfully',
      'Error removing Expenses'
    );
  }
})();
