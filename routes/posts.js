const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

router.get("/", PostsController.getPosts);
router.post("/", PostsController.addPost);
router.delete("/", PostsController.deleteAllPosts);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
