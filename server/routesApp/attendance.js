const express = require('express');
const router = express.Router();
const attendance = require('../databases/attendance');
const verifyToken = require('../token/verityToken');

router.get("/today", verifyToken, async (req, res) => {
    const user_code = res.locals.user_code;
    try {
        const result = await attendance.attendanceToday(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/register", verifyToken, async (req, res) => {
    try {
        const data = req.body;
        const user_code = res.locals.user_code;
        const result = await attendance.attendanceRegister(data, user_code)
        if (result) {
            return res
                .status(200)
                .json({ message: "출근 등록 완료" });
        }
    } catch (error) {
        console.error(error)
    }
});

router.post("/update", verifyToken, async (req, res) => {
    console.log(req.body)
    try {
        const data = req.body;
        const result = await attendance.attendanceUpdate(data);
        if (result) {
            return res
                .status(200)
                .json({ message: "퇴근 등록 완료" });
        }
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;