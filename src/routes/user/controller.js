const controller = require('./../controller');
const _ = require('lodash');


module.exports = new (class extends controller {
  async dashboard(req, res) {
    res.send('user dashboard')
  }

  async me(req, res) {
    this.response({ res, data: _.pick(req.user, ["_id", "name", "email", "currentAccount"]) })
  }

  async changeCurrentAccount(req, res) {
    const user = await this.User.findById(req.query.userId);
    user.currentAccount = req.params.id;
    await user.save();

    this.response({ res, data: _.pick(req.user, ["_id", "name", "email", "currentAccount"]), message: "successfully updated" })
  }

})();

