const express = require("express");
const { LoginController } = require('../controllers/LoginController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.post("", (req, res) => {
    const body = req.body;
    setRes(res);

    LoginController(body)
});

module.exports = router;