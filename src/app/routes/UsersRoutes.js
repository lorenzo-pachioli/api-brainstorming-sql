const express = require("express");
const { AllUsersController, NewUsersController, UsersControllerById } = require('../controllers/UsersController');
const router = express.Router();

router.post("", (req, res) => {
    const newUser = req.body;
    const token = req.header('token');
    console.log(newUser);
    NewUsersController(token, newUser, res);
});

router.get("", (req, res) => {
    const token = req.header('token');

    AllUsersController(token, res);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    UsersControllerById(token, id, res);
});

module.exports = router;
