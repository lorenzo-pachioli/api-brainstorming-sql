const express = require("express");
const {
    AllEpicsController,
    NewEpicsController,
    EpicsControllerById,
    EpicsControllerByIdAllStories,
    EpicDeleteByIdController
} = require('../controllers/EpicsController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setNext(next);

    AllEpicsController(token, res);
});

router.post("", (req, res, next) => {

    const newEpic = req.body;
    const token = req.header('token');
    setNext(next);

    NewEpicsController(token, newEpic, res);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicsControllerById(token, id, res);
});

router.get("/:id/stories", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicsControllerByIdAllStories(token, id, res);
});

router.delete("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicDeleteByIdController(token, id, res);
});

module.exports = router;
