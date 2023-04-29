const resErrorProd = ({ res, err }) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      status: "error",
      message: "系統錯誤，請恰系統管理員",
    });
  }
};

module.exports = resErrorProd;
