const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
    console.log('task get');
    res.send('task')
});

router.post("", (req, res) => {
    console.log('task post', req);
    res.send('task post')

});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('task get id', id);
    res.send(`task get id: ${id}`)

});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    console.log('task put id', id);
    res.send(`task put id: ${id}`)
});

module.exports = router;