const express = require("express");
const { LoginController } = require('../controllers/LoginController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.post("", (req, res, next) => {
    const body = req.body;
    setRes(res);
    setNext(next);

    LoginController(body)
});

module.exports = router;