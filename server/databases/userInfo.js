const { userInfo,user } = require("../models");
const dayjs = require('dayjs');

const join = async (data, user_code, transaction) => {
    const today = dayjs().format('YYYY-MM-DD');
    try {
        await user.create({
            user_code: user_code,
            user_name: data.user_name,
            user_phone:data.user_phone,
            user_nickname: "boss",
            user_hire_date: today,
            user_birth_date: today,
            user_position: "대표",
            auth_code: "A1",
            education_level_code: "UG",
            department_code: "PLANNING",
            country_code: "KR",
        }, {
            transaction, // 트랜잭션 적용
            raw: true,
        });
    } catch (error) {
        console.error("❌ userInfoJoin error:", error);
        throw error; // rollback 되도록 에러 다시 던짐
    }
};

module.exports = {
    join,

};