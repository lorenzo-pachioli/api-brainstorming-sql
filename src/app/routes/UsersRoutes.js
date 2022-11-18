const express = require("express");
const {
    AllUsersController,
    NewUsersController,
    UsersControllerById,
    ModifyUserController
} = require('../controllers/UsersController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.post("", (req, res, next) => {
    const newUser = req.body;
    const token = req.header('token');
    setNext(next);

    NewUsersController(token, newUser, res);
});

router.get("", (req, res, next) => {
    const token = req.header('token');
    setNext(next);

    AllUsersController(token, res);
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    UsersControllerById(token, id, res);
});

router.put("", (req, res, next) => {

    const newUser = req.body;
    const token = req.header('token');
    setNext(next);

    ModifyUserController(token, newUser, res);
});

module.exports = router;
