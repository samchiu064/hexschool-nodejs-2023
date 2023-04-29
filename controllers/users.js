const User = require("../models/user");
const handleSuccess = require("../services/handleSuccess");
const appError = require("../services/appError");

const users = {
  async getUsers(req, res) {
    const userData = await User.find();
    handleSuccess({ req, res, data: userData });
  },
  async addUser(req, res, next) {
    if (req.body.cotent === undefined) {
      next(appError("400", "你沒有填寫 content 資料", next));
    }
    const { name, email } = req.body;
    const userData = await User.create({
      name,
      email,
    });
    handleSuccess({ req, res, data: userData });
  },
  async deleteAllUsers(req, res) {
    const userData = await User.deleteMany({});
    handleSuccess({ req, res, data: userData });
  },
  async deleteUser(req, res) {
    const userData = await User.findByIdAndDelete(req.params.id);
    handleSuccess({ req, res, data: userData });
  },
};

module.exports = users;
