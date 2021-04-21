const express = require("express");
const { register, login, profile } = require("../controllers/auth");
const router = express.Router();

const {protect, admin} = require('../middleware/auth');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(protect, profile);

module.exports = router;
