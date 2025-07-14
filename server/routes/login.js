const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const user = require('../databases/user');

const jwtSecret = "JWT_SECRET";

router.post("/", async (req, res, next) => {

    passport.authenticate('login', (error, user, info) => {

        if (error) return res.status(500).json({ message: '서버 오류가 발생했습니다.', error });
        if (user === "-1") return res.status(401).json(user);
        if (user === "0") return res.status(401).json(user);

        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({});
        });
    })(req, res, next);
});

router.post("/aaa", async (req, res) => {
    console.log('aaaaa')
    console.log(req.body)

    // if (req.body.user_id) {
    //     return res.status(401).json({ message: "이미 가입한 회원입니다." });
    // }
    // users[req.body.email] = {
    //     email: req.body.email.toLowerCase(),
    //     password: req.body.password,
    //     name: req.body.name,
    // };

    // return res.json({
    //     data: {
    //         email: req.body.email,
    //         name: req.body.name,
    //     },
    // });

    const user_id = req.body.user_id;
    const user_password = req.body.user_password;

    const result = await user.userLogin(user_id, user_password);



    if (result) {
        const user_code = result.user_code;
        const user_name = result.user_name;
        const company_code = result.company_code;
        console.log(user_code)
        console.log(user_name)
        console.log(company_code)
        const refreshToken = jwt.sign(
            { sub: "refresh", user_id: req.body.user_id, user_code: user_code, company_code: company_code },
            jwtSecret,
            { expiresIn: "24h" }
        );

        const accessToken = jwt.sign(
            { sub: "access", user_id: req.body.user_id, user_code: user_code, company_code: company_code },
            jwtSecret,
            { expiresIn: "5m" }
        );

        return res.json({
            data: {
                user_name: user_name,
                user_code: user_code,
                refreshToken,
                accessToken,
            },
        });


    } else {

    }

    console.log(refreshToken)
    console.log(accessToken)

});

// const verifyToken = (req, res, next) => {
//     if (!req.headers.authorization) {
//         return res.status(401).json({ message: "토큰이 없습니다." });
//     }
//     try {
//         const data = jwt.verify(
//             req.headers.authorization.replace("Bearer ", ""),
//             jwtSecret
//         );
//         res.locals.email = data.email;
//     } catch (error) {
//         console.error(error);
//         if (error.name === "TokenExpiredError") {
//             return res
//                 .status(419)
//                 .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
//         }
//         return res
//             .status(401)
//             .json({ message: "유효하지 않은 액세스 토큰입니다." });
//     }
//     next();
// };


const verifyRefreshToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "토큰이 없습니다." });
    }

    try {
        const data = jwt.verify(
            req.headers.authorization.replace("Bearer ", ""),
            jwtSecret
        );
        console.log(data)
        res.locals.user_code = data.user_code;
        res.locals.user_id = data.user_id;
        res.locals.company_code = data.company_code;
    } catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return res
                .status(419)
                .json({ message: "만료된 리프레시 토큰입니다.", code: "expired" });
        }
        return res
            .status(401)
            .json({ message: "유효하지 않은 리프레시 토큰입니다." });
    }
    next();
};


router.post("/refreshToken", verifyRefreshToken, async (req, res, next) => {
    const accessToken = jwt.sign(
        {
            sub: "access",
            user_id: res.locals.user_id,
            user_code: res.locals.user_code,
            company_code: res.locals.company_code,
        },
        jwtSecret,
        { expiresIn: "5m" }
    );
    const result = await user.findByUserId(res.locals.user_id);

    if (result) {
        const user_code = result.user_code
        const user_name = result.user_name
        return res.json({
            data: {
                user_name: user_name,
                user_code: user_code,
                accessToken,
            },
        });

    }

    // if (!users[res.locals.email]) {
    //     return res.status(404).json({ message: "가입되지 않은 회원입니다." });
    // }

});



module.exports = router;