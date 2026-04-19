const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const wrapAsyc = require("../utils/wrapAsyc");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.get("/signup", userController.renderSignUpform);

router.post("/signup", wrapAsyc(userController.signUp));

router.get("/login", userController.renderLoginForm);

//passport provide an authentcate() function, which is used as route middlewares to authenticate request
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.afterLoginMsg,
);

router.get("/logout", userController.logout);

module.exports = router;
