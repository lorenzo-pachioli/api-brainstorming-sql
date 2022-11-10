const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
    console.log('stories');
    res.send('stories')
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('stories get id', id);
    res.send(`stories get id: ${id}`)
});

router.get("/:id/tasks", (req, res) => {
    const id = req.params.id;
    console.log('stories get id tasks', id);
    res.send(`stories get id tasks: ${id}`)
});

module.exports = router;