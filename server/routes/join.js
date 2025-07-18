const express = require('express');
const router = express.Router();
const company = require('../databases/company');
const user = require('../databases/user');
const userInfo = require('../databases/userInfo');

const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

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

    const userInfoData = {
        user_name: reqBodyData.company_ceo_name,
        user_phone : reqBodyData.company_ceo_phone,
    }
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(reqBodyData.user_password, saltOrRounds);

    userData.user_password = hashedPassword;

    // try {
    //     const result = await company.companyRegister(companyData);
    //     company_code = result;
    // } catch (error) {
    //     console.error(error)
    // }

    // if (company_code) {
    //     try {
    //         const result = await user.userJoin(userData, company_code);
    //         user_code = result;
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    console.log("companyData : ", companyData);
    console.log("userData : ", userData);
    console.log("userInfoData : ", userInfoData);

    const t = await sequelize.transaction();

    try {
        const company_code = await company.companyRegister(companyData, t);
        const user_code = await user.userJoin(userData, company_code, t);
        await userInfo.join(userInfoData, user_code, t);
        await t.commit();
        res.status(201).json({
            success: true,
            message: "회원가입이 완료되었습니다."
        });
    } catch (error) {
        await t.rollback();
        console.error("회원가입 실패 rollback", error);
        res.status(500).json({
            success: false,
            message: '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요',
        });
    }

    // if (user_code) { 
    //     console.log("유저 정보 테이블 진입 준비 완료");
    //     // try{
    //     //     const result = await userInfo.join(userInfoData, user_code, company_code);
    //     //     return res.json(result);
    //     // }catch(error){
    //     //     console.error(error)
    //     // } 
    // }



});



module.exports = router;