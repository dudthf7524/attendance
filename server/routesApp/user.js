const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const verifyToken = require('../token/verityToken');


router.get("/detail", authMiddlewareSession, async (req, res) => {

    // console.log('aaaaaaaaaa')
    // console.log(res.locals.user_code)
    // console.log('aaaaaaaaaa')

    const user_code = res.locals.user_code;
    console.log("유저코드 : ", user_code);

    // const user_code = req.user.user_code;
    // try {
    //     const result = await user.userDetail(user_code);
    //     return res.json(result);
    // } catch (error) {
    //     console.error(error)
    // }
});

module.exports = router;