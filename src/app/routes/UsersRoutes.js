const express = require("express");
const { AllUsersController, NewUsersController, UsersControllerById } = require('../controllers/UsersController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.post("", (req, res) => {
    const newUser = req.body;
    const token = req.header('token');
    setRes(res);

    NewUsersController(token, newUser);
});

router.get("", (req, res) => {
    const token = req.header('token');
    setRes(res);

    AllUsersController(token);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    UsersControllerById(token, id);
});

module.exports = router;
