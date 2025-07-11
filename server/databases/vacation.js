const { vacation } = require("../models");

const vacationRegister = async (data, user_code) => {
    console.log('data', data)
    try {
        const result = await vacation.create({
            start_date: data.startDate,
            end_date: data.endDate,
            reason: data.reason,
            user_code: user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    vacationRegister,
};