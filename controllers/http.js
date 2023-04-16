const http = {
  cors(req, res) {
    res.send({
      status: true,
      message: "預檢請求發送成功",
    });
  },
  notFound(req, res) {
    res.status(400).send({
      status: false,
      message: "找不到此路由",
    });
  },
};

module.exports = http;
