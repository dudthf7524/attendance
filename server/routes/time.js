const express = require('express');
const router = express.Router();
const time = require('../databases/time');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const verifyToken = require('../token/verityToken');

router.post("/register", async (req, res) => {
    console.log(req.body);
    const data = {
        start_time: req.body.startHour + ":" + req.body.startMin,
        end_time: req.body.endHour + ":" + req.body.endMin,
        rest_start_time: req.body.breakStartHour + ":" + req.body.breakStartMin,
        rest_end_time: req.body.breakEndHour + ":" + req.body.breakEndMin,
        user_code: req.body.user_code
    };

    try {
        const result = await time.timeRegister(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.get("/list/outer", async (req, res) => {
    console.log(req.user.company_code)
    const company_code = req.user.company_code;
    try {
        const result = await time.timeListOuter(company_code)
        console.log("result", result)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.get("/list/inner", async (req, res) => {
    const company_code = req.user.company_code;
    try {
        const result = await time.timeListInner(company_code)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.post("/edit", async (req, res) => {
    console.log(req.body);
    const data = {
        start_time: req.body.startHour + ":" + req.body.startMin,
        end_time: req.body.endHour + ":" + req.body.endMin,
        rest_start_time: req.body.breakStartHour + ":" + req.body.breakStartMin,
        rest_end_time: req.body.breakEndHour + ":" + req.body.breakEndMin,
        time_id: req.body.time_id
    };

    try {
        const result = await time.timeEdit(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.get("/detail", authMiddlewareSession, async (req, res) => {
    const user_code = req.user.user_code;
    try {
        const result = await time.timeDetail(user_code);
        res.json(result);
    } catch (error) {
        console.error(error)
    }
})

// router.get("/detail", verifyToken, async (req, res, next) => {
//     // console.log('aaaaaaaaaa')
//     // console.log(res.locals.user_code)
//     // console.log('aaaaaaaaaa')

//     const user_code = res.locals.user_code;

//     try {
//         const result = await time.timeDetail(user_code);
//         console.log(result)
//         res.json(result);
//     } catch (error) {
//         console.error(error)
//     }
//     //   const order = orders.filter(
//     //     (v) => v.rider === res.locals.email && !!v.completedAt
//     //   );
//     //   res.json({
//     //     data: order.reduce((a, c) => a + c.price, 0) || 0,
//     //   });
// });



module.exports = router;