const express = require("express");
const { AllTasksController, NewTasksController, TasksControllerById, ModifyTasksControllerById } = require('../controllers/TasksController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setRes(res);
    setNext(next);

    AllTasksController(token);
});

router.post("", (req, res, next) => {

    const newTask = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    NewTasksController(token, newTask);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    TasksControllerById(token, id);
});

router.put("", (req, res, next) => {

    const newTask = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    ModifyTasksControllerById(token, newTask);
});

module.exports = router;
