const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");
const handleErrorAsync = require("../services/handleErrorAsync");

router.get("/", UsersController.getUsers);
router.post("/", handleErrorAsync(UsersController.addUser));
router.delete("/", UsersController.deleteAllUsers);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
