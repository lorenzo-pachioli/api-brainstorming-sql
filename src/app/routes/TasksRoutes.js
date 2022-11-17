const express = require("express");
const { AllTasksController, NewTasksController, TasksControllerById, ModifyTasksControllerById } = require('../controllers/TasksController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.get("", (req, res) => {

    const token = req.header('token');
    setRes(res);

    AllTasksController(token);
});

router.post("", (req, res) => {

    const newTask = req.body;
    const token = req.header('token');
    setRes(res);

    NewTasksController(token, newTask);
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    TasksControllerById(token, id);
});

router.put("", (req, res) => {

    const newTask = req.body;
    const token = req.header('token');
    setRes(res);

    ModifyTasksControllerById(token, newTask);
});

module.exports = router;
