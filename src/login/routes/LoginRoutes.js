const express = require("express");

const router = express.Router();

router.post("", (req, res) => {
    console.log('login', req);
    res.send('login');
});

module.exports = router;