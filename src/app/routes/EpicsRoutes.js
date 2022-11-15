const express = require("express");
const { AllEpicsController, NewEpicsController, EpicsControllerById, EpicsControllerByIdAllStories } = require('../controllers/EpicsController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    AllEpicsController(token, res);
});

router.post("", (req, res) => {
    const newEpic = req.body;
    const token = req.header('token');
    console.log(newEpic);
    NewEpicsController(token, newEpic, res);
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