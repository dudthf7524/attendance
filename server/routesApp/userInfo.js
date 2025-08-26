const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const verifyToken = require('../token/verityToken');


router.get("/detail", verifyToken, async (req, res) => {

    const user_code = res.locals.user_code; 

    try {
        const result = await user.userDetail(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;