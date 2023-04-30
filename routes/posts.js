const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const handleErrorAsync = require("../services/handleErrorAsync");
const { isAuth } = require("../services/auth");

router.get("/", PostsController.getPosts);
router.post("/", isAuth, handleErrorAsync(PostsController.addPost));
router.delete("/", PostsController.deleteAllPosts);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
