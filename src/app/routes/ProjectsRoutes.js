const express = require("express");
const {
    AllProjectController,
    NewProjectController,
    ProjectControllerById,
    ProjectControllerByIdAllEpics,
    ProjectDeleteByIdController
} = require('../controllers/ProjectController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.post("", (req, res, next) => {

    const newProject = req.body;
    const token = req.header('token');
    setNext(next);

    NewProjectController(token, newProject, res);
});

router.get("", (req, res, next) => {

    const token = req.header('token');
    setNext(next);

    AllProjectController(token, res);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    ProjectControllerById(token, id, res);
});

router.get("/:id/epics", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    ProjectControllerByIdAllEpics(token, id, res);
});

router.delete("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    ProjectDeleteByIdController(token, id, res);
});

module.exports = router;
