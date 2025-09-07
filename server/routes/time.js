const express = require('express');
const router = express.Router();
const time = require('../databases/time');
const authMiddlewareSession = require('../middleware/authMiddlewareSession');
const verifyToken = require('../token/verityToken');

router.post("/register", async (req, res) => {
    const data = req.body;

    try {
        const result = await time.timeRegister(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.get("/view", async (req, res) => {
    console.log(req.query);
    const data = req.query;

    try {
        const result = await time.timeView(data)
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/edit", async (req, res) => {
    const data = req.body;

    try {
        const result = await time.timeEdit(data)
        res.json(result);

    } catch (error) {
        console.error(error)
    }
});

router.get("/detail", authMiddlewareSession, async (req, res) => {
    const user_code = req.query.user_code;

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