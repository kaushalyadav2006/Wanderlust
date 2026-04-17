const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const wrapAsyc = require("../utils/wrapAsyc");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/signup",
  wrapAsyc(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }),
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

//passport provide an authentcate() function, which is used as route middlewares to authenticate request
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success","welcome back to WanderLust");
    res.redirect("/listings");
  },
);

module.exports = router;
