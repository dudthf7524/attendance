const express = require('express');
const router = express.Router();
const time = require('../databases/time');
const verifyToken = require('../token/verityToken');

router.get("/detail", verifyToken, async (req, res, next) => {
    const user_code = res.locals.user_code;
    try {
        const result = await time.timeDetail(user_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;