const controller = require("../controller");
const _ = require("lodash");
const debug = require('debug')('app:main');

module.exports = new (class extends controller {

  async getPaymentMethods(req, res) {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const sort = parseInt(req.query.sort) || -1;

    const name = req.query.name;

    const searchCondition = {
      userId: req.query.userId,
      ...(name && { paymentMethodName: { $regex: new RegExp(name, 'i') } }),
    };

    await this.handleAsyncOperation(
      res,
      async () => {
        const [data, totalEntity] = await Promise.all([
          this.PaymentMethod
            .find(searchCondition)
            .sort({ createdAt: sort })
            .skip((page * size))
            .limit(size),
          this.PaymentMethod.countDocuments(searchCondition)
        ]);

        return {
          data,
          totalEntity,
          currentPage: page,
          totalPages: Math.ceil(totalEntity / size)
        };
      },
      'Payment methods fetched successfully',
      'Error fetching payment methods'
    );
  }

  async getPaymentMethod(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.PaymentMethod.findById(req.params.id),
      'Payment Method fetched successfully',
      'Error fetching payment method'
    );
  }

  async createPaymentMethod(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const paymentMethod = await this.PaymentMethod(_.pick(req.body, ["userId", "paymentMethodName"]));
        await paymentMethod.save();
        return _.pick(req.body, ["userId", "paymentMethodName"]);
      },
      'Payment method created successfully',
      'Error creating payment method'
    );
  }

  async updatePaymentMethod(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => {
        const paymentMethod = await this.PaymentMethod.findById(req.query.id);
        if (!paymentMethod) {
          this.response({ res });
          return;
        }

        paymentMethod.set({
          ...req.body,
          paymentMethodName: req.body.paymentMethodName,
        });

        await paymentMethod.save();
        return _.pick(req.body, ["userId", "paymentMethodName"]);
      },
      'Payment method updated successfully',
      'Error updating payment method'
    );
  }

  async removePaymentMethod(req, res) {
    await this.handleAsyncOperation(
      res,
      async () => await this.PaymentMethod.findByIdAndRemove(req.query.id),
      'Payment method removed successfully',
      'Error removing payment method'
    );
  }
})();
