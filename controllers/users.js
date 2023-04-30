const User = require("../models/user");
const handleSuccess = require("../services/handleSuccess");
const appError = require("../services/appError");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { generateToken } = require("../services/auth");

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
  async signUp(req, res, next) {
    const { name, email, gender, password, confirmPassword } = req.body;

    // 確認欄位都有填寫
    if (!name || !email || !gender || !password || !confirmPassword) {
      return next(appError("400", "欄位未填寫正確", next));
    }
    // 確認密碼與確認密碼相同
    if (password !== confirmPassword) {
      return next(appError("400", "密碼不一致", next));
    }
    // 確認密碼長度介於 8~16 位
    if (!validator.isLength(password, { min: 8, max: 16 })) {
      return next(appError("400", "密碼位數需介於 8~16 位", next));
    }
    // 確認 email 格式正確
    if (!validator.isEmail(email)) {
      return next(appError("400", "Email 格式錯誤", next));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });
    generateToken(newUser, 201, res);
  },
  async signIn(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(appError("400", "帳號密碼不可為空", next));
    }

    const user = await User.findOne({ email }).select("+password");
    generateToken(user, 200, res);
  },
  async updatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    // 確認欄位都有填寫
    if (!password || !confirmPassword) {
      return next(appError("400", "密碼不可為空", next));
    }
    // 確認密碼與確認密碼相同
    if (password !== confirmPassword) {
      return next(appError("400", "密碼不一致", next));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword,
    });
    handleSuccess({ req, res, data: { message: "密碼修改成功" } });
  },
  async getProfile(req, res) {
    const user = await User.findById(req.user.id).select("avatar name gender");
    handleSuccess({ req, res, data: user });
  },
  async updateProfile(req, res, next) {
    const { avatar, name, gender } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        avatar,
        name,
        gender,
      },
      { new: true }
    ).select("avatar name gender");
    handleSuccess({ req, res, data: user });
  },
};

module.exports = users;
