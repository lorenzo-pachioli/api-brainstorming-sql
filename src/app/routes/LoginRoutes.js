const express = require("express");
const { LoginController } = require('../controllers/LoginController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.post("", (req, res, next) => {

    const body = req.body;
    setNext(next);

    LoginController(body, res);
});

module.exports = router;
