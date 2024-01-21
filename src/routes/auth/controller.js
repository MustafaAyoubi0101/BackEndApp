const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "this user already registered",
      });
    }
    // const {email, name, password} = req.body;
    // user = new this.User({email, name, password});
    user = new this.User(_.pick(req.body, ["name", "email", "password", "currentAccount"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // create Default Account
    const account = await this.Account({accountName: "Default", userId: user._id})
    await account.save();

    // add currectAccount to current new user
    const currentUser = await this.User.findById(user._id)
    currentUser.currentAccount = account._id;
    await currentUser.save()
    
    this.response({
      res,
      message: "the user successfuly registered",
      data: _.pick(currentUser, ["_id", "name", "email", "currentAccount"]),
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        code: 400,
        message: "invalid eamil or password",
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({ res, message: "successfuly logged in", data: { token } });
  }
})();
