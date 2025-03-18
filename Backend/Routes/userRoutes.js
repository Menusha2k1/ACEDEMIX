const express = require("express");
const authController = require("../Controllers/userController");

const router = express.Router();

router.post("/create_account", authController.createAccount);
router.post("/login", authController.login);

module.exports = router;