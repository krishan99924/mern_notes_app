const express = require("express");
const {
  SignupController,
  LoginController,
  isUserLoggedIn,
} = require("../controllers/userControllers.js");
let router = express.Router();

router.route("/createuser").post(SignupController);
router.route("/loginuser").post(LoginController);
router.route("/auth").get(isUserLoggedIn);

module.exports = { router };
