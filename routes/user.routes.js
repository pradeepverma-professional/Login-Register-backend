const express = require("express");
const { register, login } = require("../controllers/user.controller");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello world");
});

router.get("/profile", (req, res) => {
    res.send("profile");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;