const express = require('express');
const router = express.Router();
const user = require('../databases/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const verifyToken = require('../token/verityToken');
const userInfo = require('../databases/userInfo');
const { sequelize } = require('../models');

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


router.get("/list", authMiddlewareSession, async (req, res) => {
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

router.post("/register", authMiddlewareSession, async (req, res) => {
    const t = await sequelize.transaction();
    console.log(req.body)
    console.log('aaa')

    const data = req.body;
    const company_code = req.user.company_code;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.user_password, saltOrRounds);
    data.user_password = hashedPassword;

    const userData = {
        user_id: data.user_id,
        user_password: data.user_password,
    };

    const userInfoData = {
        user_name: data.user_name,
        user_phone: data.user_phone,
        user_position: data.user_position,
        user_education: data.user_education,
        user_department: data.user_department,
        user_country: data.user_country,
        user_blood_type: data.user_blood_type,
        user_birth_date: data.user_birth_date,
        user_annual_leave: data.user_annual_leave,
        user_postcode: data.user_postcode,
        user_address_basic: data.user_address_basic,
        user_address_detail: data.user_address_detail,
        user_hire_date: data.user_hire_date,
        user_nickname: data.user_nickname,
    }


    try {
        const user_code = await user.userRegister(userData, company_code, t);
        await userInfo.userInfoRegister(userInfoData, user_code, t)
        await t.commit();
        res.status(201).json({
            success: true,
            message: "직원등록이 완료되었습니다."
        });
    } catch (error) {
        await t.rollback();
        console.error(error)
        res.status(500).json({
            success: false,
            message: '직원등록 중 오류가 발생했습니다. 다시 시도해 주세요',
        });
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

router.post("/logout", verifyToken, (req, res, next) => {

    delete res.locals.email;
    res.json({ message: "ok" });
});

router.get("/view", async (req, res, next) => {
    console.log("user_code" + req.query.user_code);
    const user_code = req.query.user_code;

    try {
        const result = await userInfo.userInfoView(user_code)
        res.json(result);
    } catch (error) {
    }
})

module.exports = router;