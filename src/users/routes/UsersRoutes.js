const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    console.log('users');
    res.send('users')
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log('users id', id);
    res.send(`users id: ${id}`)

});

module.exports = router;
