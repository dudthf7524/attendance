const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');


router.post("/join", async (req, res) => {

    const data = req.body;
    try {
        const result = await user.userJoin(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.post('/login', async (req, res, next) => {

    passport.authenticate('user', (error, user, info) => {

        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (user === "-1") return res.status(401).json(user);
        if (user === "0") return res.status(401).json(user);

        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({});
        });
    })(req, res, next);
});


router.get("/list", async (req, res) => {
    const company_code = req.user.company_code;
    try {
        const result = await user.userList(company_code)
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/check/id", async (req, res) => {
    const data = req.body;
    try {
        const result = await user.userCheckId(data);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/register", async (req, res) => {
    const data = req.body;
    const company_code = req.user.company_code;

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(data.user_password, saltOrRounds);


    data.user_password = hashedPassword;

    try {
        const result = await user.userRegister(data, company_code);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/edit", async (req, res) => {
    console.log(req.body)
    const data = req.body;
    try {
        const result = await user.userEdit(data);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.post("/delete", async (req, res) => {
    console.log(req.body)
    const data = req.body;
    try {
        const result = await user.userDelete(data);
        res.json(result);
    } catch (error) {
        console.error(error)

    }
});

router.get("/detail", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    try {
        const result = await user.userDetail(user_code);
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});


module.exports = router;