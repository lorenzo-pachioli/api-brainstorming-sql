const express = require("express");
const { AllEpicsController, NewEpicsController, EpicsControllerById, EpicsControllerByIdAllStories } = require('../controllers/EpicsController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.get("", (req, res) => {

    const token = req.header('token');
    setRes(res);

    AllEpicsController(token);
});

router.post("", (req, res) => {

    const newEpic = req.body;
    const token = req.header('token');
    setRes(res);

    NewEpicsController(token, newEpic);
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    EpicsControllerById(token, id);
});

router.get("/:id/stories", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    EpicsControllerByIdAllStories(token, id);
});

module.exports = router;