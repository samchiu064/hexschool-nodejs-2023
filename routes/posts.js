const express = require("express");
const router = express.Router();
const HttpController = require("../controllers/http");
const PostsController = require("../controllers/posts");

router.get("/", PostsController.getPosts);
router.post("/", PostsController.addPost);
router.patch("/:id", PostsController.updatePost);
router.delete("/", PostsController.deleteAllPost);
router.delete("/:id", PostsController.deletePost);
router.options("/", HttpController.cors);

module.exports = router;
