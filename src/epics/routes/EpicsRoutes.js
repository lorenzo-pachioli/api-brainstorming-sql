const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
    console.log('epics');
    res.send('epics')
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('epics get id', id);
    res.send(`epics get id: ${id}`)
});

router.get("/:id/stories", (req, res) => {
    const id = req.params.id;
    console.log('epics get id stories', id);
    res.send(`epics get id stories: ${id}`)
});

module.exports = router;