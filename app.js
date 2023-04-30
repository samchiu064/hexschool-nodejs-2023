const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const resErrorDev = require("./services/resErrorDev");
const resErrorProd = require("./services/resErrorProd");

const app = express();

require("./connections");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// Express 404 錯誤
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "您指定的路由不存在",
  });
});

// Express 500 錯誤
app.use((err, req, res, next) => {
  err.statusCode === err.statusCode || 500;

  if (process.env.NODE_ENV === "dev") {
    return resErrorDev({ res, err });
  }
  if (process.env.NODE_ENV === "prod") {
    return resErrorProd({ res, err });
  }
  res.status(500).send({
    status: false,
    message: err,
  });
});

// Node.js 錯誤，uncaughtException
process.on("uncaughtException", (err) => {
  // 將錯誤記錄下來，等到服務都處理完後，停掉該 process
  console.error("Uncaughted Exception！");
  console.error(err);
  process.exit(1);
});

// Node.js 錯誤，unhandledRejection
process.on("unhandledRejection", (reason, promise) => {
  console.error("未捕捉到的 rejection：", promise, "原因：", reason);
});

module.exports = app;
