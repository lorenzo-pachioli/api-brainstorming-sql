const express = require("express");
const { ProjectController, ProjectControllerById } = require('../controlers/ProjectController');
const router = express.Router();

router.get("", (req, res) => {
    const token = req.header('token');

    ProjectController(token, res);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    ProjectControllerById(token, id, res);
});

router.get("/:id/epics", (req, res) => {
    const id = req.params.id;
    const token = req.header('token');

    ProjectControllerById(token, id, res);
});

module.exports = router;
