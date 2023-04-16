const User = require("../models/user");
const handleSuccess = require("../services/handleSuccess");
const handleError = require("../services/handleError");

const users = {
  async getUsers(req, res) {
    const userData = await User.find();
    handleSuccess({ req, res, data: userData });
  },
  async addUser(req, res) {
    const { name, email } = req.body;
    try {
      const userData = await User.create({
        name,
        email,
      });
      handleSuccess({ req, res, data: userData });
    } catch (err) {
      handleError({ res, err });
    }
  },
  async deleteAllUsers(req, res) {
    const userData = await User.deleteMany({});
    handleSuccess({ req, res, data: userData });
  },
  async deleteUser(req, res) {
    try {
      const userData = await User.findByIdAndDelete(req.params.id);
      handleSuccess({ req, res, data: userData });
    } catch (err) {
      handleError({ res, err });
    }
  },
};

module.exports = users;
