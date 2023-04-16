const handleError = ({ res, err }) => {
  res.status(400).send({
    status: false,
    error: err.errors,
    message: err.message,
  });
};

module.exports = handleError;
