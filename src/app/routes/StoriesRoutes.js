const express = require("express");
const {
    AllStoriesController,
    NewStoriesController,
    StoriesControllerById,
    StoriesControllerByIdAllTasks
} = require('../controllers/StoriesController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setRes(res);
    setNext(next);

    AllStoriesController(token);
});

router.post("", (req, res, next) => {

    const newStory = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    NewStoriesController(token, newStory);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    StoriesControllerById(token, id);
});

router.get("/:id/tasks", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    StoriesControllerByIdAllTasks(token, id);
});

module.exports = router;
