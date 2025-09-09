const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const router = express.Router();
const userController = require("../controllers/user.js");
const user = require("../models/user.js");


router
.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));

router
.route("/login")
.get(userController.renderLogin)
.post(
  saveRedirectUrl ,
   passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout",userController.logout);

module.exports = router;