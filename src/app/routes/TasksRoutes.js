const express = require("express");
const {
    AllTasksController,
    NewTasksController,
    TasksControllerById,
    TasksDeleteControllerById,
    ModifyTasksByIdController
} = require('../controllers/TasksController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.get("", (req, res, next) => {

    const token = req.header('token');
    setNext(next);

    AllTasksController(token, res);
});

router.post("", (req, res, next) => {

    const newTask = req.body;
    const token = req.header('token');
    setNext(next);

    NewTasksController(token, newTask, res);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    TasksByIdController(token, id, res);
});

router.delete("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    TasksDeleteByIdController(token, id, res);
});

router.put("", (req, res, next) => {

    const newTask = req.body;
    const token = req.header('token');
    setNext(next);

    ModifyTasksByIdController(token, newTask, res);
});

module.exports = router;
