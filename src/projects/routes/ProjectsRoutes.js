const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
    res.send('post')
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('projects get id', id);
    res.send(`projects get id: ${id}`)
});

router.get("/:id/epics", (req, res) => {
    const id = req.params.id;
    console.log('projects get id epics', id);
    res.send(`projects get id epics: ${id}`)
});

module.exports = router;