const express = require("express");
const { TasksController, NewTasksController, TasksControllerById } = require('../controlers/TasksController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    TasksController(token, res);
});

router.post("", (req, res) => {
    const newTask = req.body;
    const token = req.header('token');

    NewTasksController(token, newTask, res);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    TasksControllerById(token, id, res);
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    TasksControllerById(token, id, res);
});

module.exports = router;
