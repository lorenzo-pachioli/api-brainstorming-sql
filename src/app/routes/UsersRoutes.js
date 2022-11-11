const express = require("express");
const { UsersController, UsersControllerById } = require('../controllers/UsersController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    UsersController(token, res);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    UsersControllerById(token, id, res);
});

module.exports = router;
