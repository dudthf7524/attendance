const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/number', async (req, res) => {
    require('dotenv').config();
    const SERVICE_KEY = process.env.BUSINESS_REGISTER_CONFIRM_KEY;
    console.log(SERVICE_KEY)
    const company_number = req.body;
    console.log(company_number)
    try {
        const result = await axios.post(
            `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${SERVICE_KEY}`,
            company_number,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        console.log(result.data.data[0])
        if (result.data.data[0].b_stt_cd) {
            res.json(result.data.data[0].b_stt_cd);
        } else {
            const randomKey = Math.random().toString(36).substr(2, 9);
            res.json(randomKey)
        }

    } catch (error) {
        console.error('공공 API 오류:', error.response?.data || error.message);
        res.status(500).json({ message: '사업자 인증 요청 실패' });
    }
});

module.exports = router;