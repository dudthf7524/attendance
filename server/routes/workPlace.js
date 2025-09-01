const express = require('express');
const router = express.Router();
const workPlace = require('../databases/workPlace');
const e = require('express');


router.post("/register", async (req, res) => {
    const data = req.body;
    const company_code = req.user.company_code;
    try {
        const result = await workPlace.workPlaceRegister(data, company_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/get", async (req, res) => {
    const company_code = req.user.company_code;
    try {
        const result = await workPlace.workPlaceGet(company_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/edit", async (req, res) => {
    const data = req.body;
    const company_code = req.user.company_code;
    try {
        const result = await workPlace.workPlaceEdit(data, company_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;