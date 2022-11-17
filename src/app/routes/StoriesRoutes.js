const express = require("express");
const {
    AllStoriesController,
    NewStoriesController,
    StoriesControllerById,
    StoriesControllerByIdAllTasks
} = require('../controllers/StoriesController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.get("", (req, res) => {

    const token = req.header('token');
    setRes(res);

    AllStoriesController(token);
});

router.post("", (req, res) => {

    const newStory = req.body;
    const token = req.header('token');
    setRes(res);

    NewStoriesController(token, newStory);
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    StoriesControllerById(token, id);
});

router.get("/:id/tasks", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    StoriesControllerByIdAllTasks(token, id);
});

module.exports = router;
