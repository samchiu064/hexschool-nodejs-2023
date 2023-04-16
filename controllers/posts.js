const Post = require("../models/post");
const handleSuccess = require("../services/handleSuccess");
const handleError = require("../services/handleError");

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
  async addPost(req, res) {
    const { user, article, image } = req.body;
    try {
      const postData = await Post.create({
        user,
        article,
        image,
      });
      handleSuccess({ req, res, data: postData });
    } catch (err) {
      handleError({ res, err });
    }
  },
  async deleteAllPosts(req, res) {
    const postData = await Post.deleteMany({});
    handleSuccess({ req, res, data: postData });
  },
  async deletePost(req, res) {
    try {
      const postData = await Post.findByIdAndDelete(req.params.id);
      handleSuccess({ req, res, data: postData });
    } catch (err) {
      handleError({ res, err });
    }
  },
};

module.exports = posts;
