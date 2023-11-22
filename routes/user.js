const express = require("express");

const { newUser, register, login, loginUser, getProfile, } = require("../controllers/user");

const isAuthenticated = require("../middlewares/auth")

const router = express.Router();


router.route("/register").get(register).post(newUser);
router.route("/login").get(login).post(loginUser);
router.get("/me",isAuthenticated , getProfile);

module.exports = router;
