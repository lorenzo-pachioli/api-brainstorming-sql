const express = require("express");
const { EpicsController, EpicsControllerById, EpicsControllerByIdAllStories } = require('../controllers/EpicsController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    EpicsController(token, res)
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    EpicsControllerById(token, id, res);
});

router.get("/:id/stories", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    EpicsControllerByIdAllStories(token, id, res);
});

module.exports = router;