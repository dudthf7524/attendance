const express = require('express');
const router = express.Router();
const vacation = require('../databases/vacation');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');

router.get("/list", authMiddlewareSession, async (req, res) => {
    const company_code = req.user.company_code;
    try {
        const result = await vacation.vacationList(company_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/approval", async (req, res) => {
    console.log("넘어온 데이터",req.body)
    
    const vacation_id = req.body.vacation_id;
    try {
        const result = await vacation.vacationApproval(vacation_id);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/reject", async (req, res) => {
    console.log("넘어온 데이터",req.body)
    
    const vacation_id = req.body.vacation_id;
    try {
        const result = await vacation.vacationReject(vacation_id);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;