const express = require('express');
const router = express.Router();
const workPlace = require('../databases/app/workPlace');
const verifyToken = require('../token/verityToken');

router.get("/detail", verifyToken, async (req, res) => {
    const company_code = res.locals.company_code;
    try {
        const result = await workPlace.workPlaceDetail(company_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;