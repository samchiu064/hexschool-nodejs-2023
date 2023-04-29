const resErrorDev = ({ res, err }) => {
  res.status(err.statusCode).send({
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = resErrorDev;
