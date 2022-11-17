const express = require("express");
const { AllEpicsController, NewEpicsController, EpicsControllerById, EpicsControllerByIdAllStories } = require('../controllers/EpicsController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setRes(res);
    setNext(next);

    AllEpicsController(token);
});

router.post("", (req, res, next) => {

    const newEpic = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    NewEpicsController(token, newEpic);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    EpicsControllerById(token, id);
});

router.get("/:id/stories", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    EpicsControllerByIdAllStories(token, id);
});

module.exports = router;