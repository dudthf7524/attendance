const express = require('express');
const router = express.Router();
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const attendance = require('../databases/attendance');
const dayjs = require('dayjs');
const verifyToken = require('../token/verityToken');

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

router.post("/edit", authMiddlewareSession, async (req, res) => {
    try {
        const data = req.body;
        const result = await attendance.attendanceEdit(data);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/list", authMiddlewareSession, async (req, res) => {
    const data = req.query;
    console.log(req.query)
    const company_code = req.user.company_code;
    try {
        const result = await attendance.attendanceList(data, company_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.get("/search", async (req, res) => {
    const activeTab = req.query.activeTab;
    const company_code = req.user.company_code;

    let startDate = null;
    let endDate = null;

    if (activeTab === "day") {
        const { startDay, endDay } = req.query;
        startDate = startDay;
        endDate = endDay;

    } else if (activeTab === "month") {
        const { startMonth, endMonth } = req.query;
        startDate = `${startMonth}-01`;
        endDate = dayjs(`${endMonth}-01`).endOf("month").format("YYYY-MM-DD");

    } else if (activeTab === "year") {
        const { startYear, endYear } = req.query;
        startDate = `${startYear}-01-01`;
        endDate = `${endYear}-12-31`;
    }
    try {
        const result = await attendance.attendanceDay(startDate, endDate, company_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;