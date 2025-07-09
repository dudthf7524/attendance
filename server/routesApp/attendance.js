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

module.exports = router;