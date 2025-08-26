const { userInfo, country, department, educationLevel } = require("../models");

const userInfoView = async (user_code) => {
    try {
        const result = await userInfo.findOne({
            attributes: [
                'user_birth_date',
                'user_annual_leave',
                'user_blood_type',
                'user_phone',
                'user_postcode',
                'user_address_basic',
                'user_address_detail'
            ],
            include: [
                {
                    model: country,
                    attributes: ['country_name'],
                    required: true
                },
                {
                    model: department,
                    attributes: ['department_name'],
                    required: true
                },
                {
                    model: educationLevel,
                    attributes: ['education_level_name'],
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

module.exports = {
    userInfoView,
};