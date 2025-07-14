const express = require('express');
const router = express.Router();
const vacation = require('../databases/vacation');
const verifyToken = require('../token/verityToken');

router.post("/register", verifyToken, async (req, res, next) => {
    
    const user_code = res.locals.user_code;
    const company_code = res.locals.company_code;
    const data = req.body;

    try {
        const result = await vacation.vacationRegister(data, user_code, company_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/list", verifyToken, async (req, res) => {
    const user_code = res.locals.user_code;
    try {
        const result = await vacation.vacationUserList(user_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;