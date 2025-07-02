const express = require('express');
const router = express.Router();
const auth = require('../databases/auth');



router.get("/", async (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        console.error(error)
    }

});

router.get("/list", async (req, res) => {

    try {
        const result = await auth.authList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;