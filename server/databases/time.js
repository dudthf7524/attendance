const { user, time } = require("../models");

const timeRegister = async (data) => {
    try {
        const result = await time.create({
            user_code: data.user_code,
            start_time: data.start_time,
            end_time: data.end_time,
            rest_start_time: data.rest_start_time,
            rest_end_time: data.rest_end_time,
            raw: true
        });
        return result
    } catch (error) {
        console.error(error);
    }
};

const timeListOuter = async (company_code) => {
    try {
        const result = await user.findAll({
            attributes: ['user_code', 'user_name', 'user_nickname', 'user_hire_date', 'user_position'],
            include: [
                {
                    model: time,
                    required: false,
                },
            ],
            where: { company_code: company_code },

        })
        return result;
    } catch (error) {
        console.error(error);
    }
};

const timeListInner = async (company_code) => {
    try {
        const result = await user.findAll({
            attributes: ['user_code', 'user_name', 'user_nickname', 'user_hire_date', 'user_position'],
            include: [
                {
                    model: time,
                    required: true,
                },
            ],
            where: { company_code: company_code },

        })
        return result;
    } catch (error) {
        console.error(error);
    }
};

const timeEdit = async (data) => {

    try {
        const result = await time.update(
            {
                start_time: data.start_time,
                end_time: data.end_time,
                rest_start_time: data.rest_start_time,
                rest_end_time: data.rest_end_time
            },
            {
                where: { time_id: data.time_id }
            }
        )
        return result;
    } catch (error) {
        console.error(error);
    }
};

const timeDetail = async (user_code) => {
    try {
        const result = await time.findOne({ where: { user_code: user_code } });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    timeRegister,
    timeListOuter,
    timeListInner,
    timeEdit,
    timeDetail,
};