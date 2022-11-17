const express = require("express");
const { AllUsersController, NewUsersController, UsersControllerById } = require('../controllers/UsersController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.post("", (req, res, next) => {
    const newUser = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    NewUsersController(token, newUser);
});

router.get("", (req, res, next) => {
    const token = req.header('token');
    setRes(res);
    setNext(next);

    AllUsersController(token);
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    UsersControllerById(token, id);
});

module.exports = router;
