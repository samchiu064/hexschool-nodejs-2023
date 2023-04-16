const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");

router.get("/", UsersController.getUsers);
router.post("/", UsersController.addUser);
router.delete("/", UsersController.deleteAllUsers);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
