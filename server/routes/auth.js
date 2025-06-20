const express = require('express');
const router = express.Router();
const auth = require('../databases/auth');
const company = require('../databases/company');
const user = require('../databases/user');

router.get("/list", async (req, res) => {

    try {
        const result = await auth.authList()
        return res.json(result);
    } catch (error) {
        console.error(error)
    }
});

router.post("/join", async (req, res) => {

    const companyData = req.body.company;
    const userData = req.body.user;

    var compnay_code;

    try {
        const result = await company.companyRegister(companyData);
        compnay_code = result;
    } catch (error) {
        console.error(error)
    }

    try {
        const result = await user.userJoin(userData, compnay_code);
        // return res.json(result);
    } catch (error) {
        console.error(error)
    }

});

module.exports = router;