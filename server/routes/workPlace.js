const express = require('express');
const router = express.Router();
const workPlace = require('../databases/workPlace');


router.post("/register", async (req, res) => {
    const data = req.body;
    const company_code = req.user.company_code;
    try {
        const result = await workPlace.workPlaceRegister(data, company_code);
        res.json(result);
    } catch (error) {

    }
});

module.exports = router;