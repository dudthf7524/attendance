const { user, time, userInfo } = require("../models");

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

const timeView = async (data) => {
    try {
        const result = await time.findOne({
            where: { user_code: data.user_code },
            raw: true
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
    timeView,
    timeEdit,
    timeDetail,
};