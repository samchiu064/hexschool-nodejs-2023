const handleError = (res, err) => {
  res.status(400).send({
    status: "fail",
    error: err.erros,
    message: err.message,
  });
};

module.exports = handleError;
