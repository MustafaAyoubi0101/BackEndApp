const controller = require("../controller");
const _ = require("lodash");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getSavings(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size);
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
          this.Savings
            .find(searchCondition)
            .sort({ createdAt: sort })
            .skip((page * size))
            .limit(size),
          this.Savings.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
          currentPage: page,
          totalPages: Math.ceil(totalEntity / size)
        };
      },
      'Savings fetched successfully',
      'Error fetching Savings'
    );
  }

  async getSaving(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Savings.findById(req.params.id),
      'Savings fetched successfully',
      'Error fetching Savings'
    );
  }

  async createSavings(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const saving = await this.Savings(_.pick(req.body, ["accountId", "savingAmount", "paymentMethod", "note", "date"]));
        await saving.save();
        return _.pick(req.body, ["accountId", "savingAmount", "paymentMethod", "note", "date"]);
      },
      'Savings created successfully',
      'Error creating saving'
    );
  }

  async updateSaving(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const saving = await this.Savings.findById(req.query.id);
        if (!saving) {
          this.response({ res });
          return;
        }

        saving.set({
          ...req.body,
          savingAmount: req.body.savingAmount,
          note: req.body.note,
          paymentMethod: req.body.paymentMethod,
          date: req.body.date
        });

        await saving.save();
        return _.pick(req.body, ["account_id", "savingAmount", "paymentMethod", "note", "date"]);
      },
      'Savings updated successfully',
      'Error updating saving'
    );
  }

  async removeSaving(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.Savings.findByIdAndRemove(req.query.id),
      'Savings removed successfully',
      'Error removing saving'
    );
  }
})();
