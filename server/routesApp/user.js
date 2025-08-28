const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const verifyToken = require('../token/verityToken');
const  userInfo  = require('../databases/app/userInfo');


router.get("/detail", verifyToken, async (req, res) => {

    const user_code = res.locals.user_code; 

    try {
        const result = await userInfo.userInfoDetail(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;