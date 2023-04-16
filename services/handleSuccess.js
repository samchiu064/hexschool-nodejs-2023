const handleSuccess = ({ req, res, data }) => {
  res.send({
    status: true,
    data,
  });
};

module.exports = handleSuccess;
