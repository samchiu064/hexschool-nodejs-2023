const Post = require("../models/post");
const handleSuccess = require("../services/handleSuccess");
const appError = require("../services/appError");

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt";
    const q =
      req.query.q !== undefined ? { article: new RegExp(req.query.q) } : {};
    const postData = await Post.find(q)
      .populate({
        path: "user",
        select: "name avatar",
      })
      .sort(timeSort);
    handleSuccess({ req, res, data: postData });
  },
  async addPost(req, res, next) {
    if (req.body.content === undefined) {
      return next(appError(400, "你沒有填寫 content 資料", next));
    }
    const { user, article, image } = req.body;
    const postData = await Post.create({
      user,
      article,
      image,
    });
    handleSuccess({ req, res, data: postData });
  },
  async deleteAllPosts(req, res) {
    const postData = await Post.deleteMany({});
    handleSuccess({ req, res, data: postData });
  },
  async deletePost(req, res) {
    const postData = await Post.findByIdAndDelete(req.params.id);
    handleSuccess({ req, res, data: postData });
  },
};

module.exports = posts;
