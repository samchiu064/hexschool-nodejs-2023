const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users");
const handleErrorAsync = require("../services/handleErrorAsync");
const { isAuth } = require("../services/auth");

router.get("/", UsersController.getUsers);
router.post("/", handleErrorAsync(UsersController.addUser));
router.delete("/", UsersController.deleteAllUsers);
router.delete("/:id", UsersController.deleteUser);
router.post("/sign_up", UsersController.signUp);
router.post("/sign_in", UsersController.signIn);
router.post("/updatePassword", isAuth, UsersController.updatePassword);
router.get("/profile", isAuth, UsersController.getProfile);
router.patch("/profile", isAuth, UsersController.updateProfile);

module.exports = router;
