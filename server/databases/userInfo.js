const { userInfo, country, department, educationLevel } = require("../models");
const dayjs = require('dayjs');

const join = async (data, user_code, transaction) => {
    const today = dayjs().format('YYYY-MM-DD');
    try {
        await userInfo.create({
            user_code: user_code,
            user_name: data.user_name,
            user_phone: data.user_phone,
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

const userInfoView = async (user_code) => {
    try {
        const result = await userInfo.findOne({
            attributes: [
                'user_name',
                'user_nickname',
                'user_hire_date',
                'user_birth_date',
                'user_annual_leave',
                'user_position',
                'user_blood_type',
                'user_phone',
                'user_postcode',
                'user_address_basic',
                'user_address_detail'
            ],
            include: [
                {
                    model: country,
                    attributes: ['country_name', 'country_code'],
                    required: true
                },
                {
                    model: department,
                    attributes: ['department_name', 'department_code'],
                    required: true
                },
                {
                    model: educationLevel,
                    attributes: ['education_level_name', 'education_level_code'],
                    required: true
                }
            ],

            where: { user_code: user_code }

        })
        return result;
    } catch (error) {
        console.error(error);
    }
};

const userInfoRegister = async (data, user_code, transaction) => {
    try {
        await userInfo.create({
            user_code: user_code,
            user_name: data.user_name,
            user_phone: data.user_phone,
            user_nickname: data.user_nickname,
            user_hire_date: data.user_hire_date,
            user_birth_date: data.user_birth_date,
            user_position: data.user_position,
            auth_code: "A3",
            education_level_code: data.user_education,
            department_code: data.user_department,
            country_code: data.user_country,
            user_blood_type: data.user_blood_type,
            user_annual_leave: data.user_annual_leave,
            user_postcode: data.user_postcode,
            user_address_basic: data.user_address_basic,
            user_address_detail: data.user_address_detail,
        }, {
            transaction, // 트랜잭션 적용
            raw: true,
        });
    } catch (error) {
        console.error("❌ userInfoRegister error:", error);
        throw error; // rollback 되도록 에러 다시 던짐
    }
}

module.exports = {
    join,
    userInfoView,
    userInfoRegister
};