const express = require("express");
const {
    AllStoriesController,
    NewStoriesController,
    StoriesControllerById,
    StoriesControllerByIdAllTasks,
    StoryDeleteByIdController
} = require('../controllers/StoriesController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setNext(next);

    AllStoriesController(token, res);
});

router.post("", (req, res, next) => {

    const newStory = req.body;
    const token = req.header('token');
    setNext(next);

    NewStoriesController(token, newStory, res);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    StoriesControllerById(token, id, res);
});

router.get("/:id/tasks", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    StoriesControllerByIdAllTasks(token, id, res);
});

router.delete("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    StoryDeleteByIdController(token, id, res);
});

module.exports = router;
