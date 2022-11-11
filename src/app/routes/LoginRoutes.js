const express = require("express");
const { LoginController } = require('../controlers/LoginController');
const router = express.Router();

router.post("", (req, res) => {
    const body = req.body;

    LoginController(body, res)
});

module.exports = router;