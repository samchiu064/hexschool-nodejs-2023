const Post = require("../models/post");
const handleError = require("../services/handleError");
const handleSuccess = require("../services/handleSuccess");

const posts = {
  async getPosts(req, res) {
    const postData = await Post.find();
    handleSuccess({ req, res, data: postData });
  },
  async addPost(req, res) {
    try {
      const { name, tags, type, image, createAt, content, likes, comments } =
        req.body;
      const postData = await Post.create({
        name,
        tags,
        type,
        image,
        createAt,
        content,
        likes,
        comments,
      });
      handleSuccess({ req, res, data: postData });
    } catch (err) {
      handleError(res, err);
    }
  },
  async updatePost(req, res) {
    try {
      const { name, tags, type, image, createAt, content, likes, comments } =
        req.body;
      const postData = await Post.findByIdAndUpdate(req.params.id, {
        name,
        tags,
        type,
        image,
        createAt,
        content,
        likes,
        comments,
      });
      handleSuccess({ req, res, data: postData });
    } catch (err) {
      handleError(res, err);
    }
  },
  async deleteAllPost(req, res) {
    const postData = await Post.deleteMany({});
    handleSuccess({ req, res, data: postData });
  },
  async deletePost(req, res) {
    try {
      const postData = await Post.findByIdAndDelete(req.params.id);
      handleSuccess({ req, res, data: postData });
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = posts;
