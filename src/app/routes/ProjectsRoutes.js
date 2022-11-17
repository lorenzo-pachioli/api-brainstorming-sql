const express = require("express");
const { AllProjectController, NewProjectController, ProjectControllerById, ProjectControllerByIdAllEpics } = require('../controllers/ProjectController');
const router = express.Router();

router.post("", (req, res) => {

    const newProject = req.body;
    const token = req.header('token');

    NewProjectController(token, newProject, res);
});

router.get("", (req, res) => {

    const token = req.header('token');

    AllProjectController(token, res);
});

router.get("/:id", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');

    ProjectControllerById(token, id, res);
});

router.get("/:id/epics", (req, res) => {

    const id = req.params.id;
    const token = req.header('token');

    ProjectControllerByIdAllEpics(token, id, res);
});

module.exports = router;
