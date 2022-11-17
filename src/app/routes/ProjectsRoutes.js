const express = require("express");
const { AllProjectController, NewProjectController, ProjectControllerById, ProjectControllerByIdAllEpics } = require('../controllers/ProjectController');
const router = express.Router();
const { setRes } = require('../../utils/response');

router.post("", (req, res) => {

    const newProject = req.body;
    const token = req.header('token');
    setRes(res);

    NewProjectController(token, newProject);
});

router.get("", (req, res) => {

    const token = req.header('token');
    setRes(res);

    AllProjectController(token);
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    ProjectControllerById(token, id);
});

router.get("/:id/epics", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');
    setRes(res);

    ProjectControllerByIdAllEpics(token, id);
});

module.exports = router;
