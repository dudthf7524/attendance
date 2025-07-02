const express = require('express');
const router = express.Router();
const company = require('../databases/company');
const user = require('../databases/user');
const bcrypt = require('bcrypt');


router.post("/", async (req, res) => {
    console.log(req.body);

    const reqBodyData = req.body;

    const companyData = {
        company_number: reqBodyData.company_number,
        company_name: reqBodyData.company_name,
        company_type: reqBodyData.company_type,
        company_count: reqBodyData.company_count,
        company_ceo_name: reqBodyData.company_ceo_name,
        company_ceo_phone: reqBodyData.company_ceo_phone,
    };

    const userData = {
        user_id: reqBodyData.user_id,
        user_password: reqBodyData.user_password,
        user_name: reqBodyData.company_ceo_name,

    };

    var company_code;

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(reqBodyData.user_password, saltOrRounds);

    userData.user_password = hashedPassword;

    try {
        const result = await company.companyRegister(companyData);
        company_code = result;
    } catch (error) {
        console.error(error)
    }

    if (company_code) {
        try {
            const result = await user.userJoin(userData, company_code);
            return res.json(result);
        } catch (error) {
            console.error(error)
        }
    }



});



module.exports = router;