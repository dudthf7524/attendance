const express = require('express');
const router = express.Router();
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const attendance = require('../databases/attendance');

router.post("/register", authMiddlewareSession, async (req, res) => {
    try {
        const data = req.body;
        const user_code = req.user.user_code;
        const result = await attendance.attendanceRegister(data, user_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/today", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    try {
        const result = await attendance.attendanceToday(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", authMiddlewareSession, async (req, res) => {
    try {
        const data = req.body;
        const result = await attendance.attendanceUpdate(data);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;