const express = require("express");
const { AllProjectController, NewProjectController, ProjectControllerById, ProjectControllerByIdAllEpics } = require('../controllers/ProjectController');
const router = express.Router();
const { setRes, setNext } = require('../../utils/response');

router.post("", (req, res, next) => {

    const newProject = req.body;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    NewProjectController(token, newProject);
});

router.get("", (req, res, next) => {

    const token = req.header('token');
    setRes(res);
    setNext(next);

    AllProjectController(token);
});

router.get("/:id", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    ProjectControllerById(token, id);
});

router.get("/:id/epics", (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);
    setNext(next);

    ProjectControllerByIdAllEpics(token, id);
});

module.exports = router;
