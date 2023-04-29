const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const handleErrorAsync = require("../services/handleErrorAsync");

router.get("/", PostsController.getPosts);
router.post("/", handleErrorAsync(PostsController.addPost));
router.delete("/", PostsController.deleteAllPosts);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
