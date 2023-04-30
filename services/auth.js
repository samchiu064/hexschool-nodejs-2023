const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleErrorAsync = require("./handleErrorAsync");
const appError = require("./appError");

const isAuth = handleErrorAsync(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return appError("401", "請先登入", next);
  }

  const decoded = await verifyToken(token);
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;
  next();
});

const generateToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // 手動將密碼設為 undefined，避免回傳給前端
  user.password = undefined;

  res.status(statusCode).send({
    status: true,
    user: {
      token,
      name: user.name,
    },
  });
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    appError("401", "請先登入", next);
  }

  return payload;
};

module.exports = {
  isAuth,
  generateToken,
};
