const express = require('express');
const router = express.Router();
const passport = require('passport');

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

module.exports = router;