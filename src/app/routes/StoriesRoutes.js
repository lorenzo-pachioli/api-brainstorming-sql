const express = require("express");
const { StoriesController, StoriesControllerById, StoriesControllerByIdAllTasks } = require('../controllers/StoriesController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    StoriesController(token, res);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    StoriesControllerById(token, id, res);
});

router.get("/:id/tasks", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    StoriesControllerByIdAllTasks(token, id, res);
});

module.exports = router;
