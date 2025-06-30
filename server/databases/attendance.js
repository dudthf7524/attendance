const { Op } = require("sequelize");
const { attendance, user, company } = require("../models");
const dayjs = require('dayjs');

const attendanceRegister = async (data, user_code) => {
    try {
        const result = await attendance.create({
            attendance_start_date: data.attendance_start_date,
            attendance_start_time: data.attendance_start_time,
            attendance_start_state: data.attendance_start_state,
            start_time: data.start_time,
            rest_start_time: data.rest_start_time,
            rest_end_time: data.rest_end_time,
            user_code: user_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const attendanceToday = async (user_code) => {
    const now = dayjs(); // 여기에 새로 선언
    const attendance_start_date = now.format('YYYY-MM-DD');

    try {
        const result = await attendance.findOne({
            where: {
                user_code: user_code,
                attendance_start_date: attendance_start_date
            },
            order: [['attendance_id', 'DESC']],
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const attendanceUpdate = async (data) => {
    try {
        const result = await attendance.update(
            {
                attendance_end_date: data.attendance_end_date,
                attendance_end_time: data.attendance_end_time,
                attendance_end_state: data.attendance_end_state,
            },
            {
                where: { attendance_id: data.attendance_id }
            }
        )
        return result;
    } catch (error) {
        console.error(error);
    }
};


const attendanceDay = async (startDay, endDay, company_code) => {
    try {
        const result = await attendance.findAll({
            attributes: [
                'attendance_start_date',
                'attendance_start_time',
                'attendance_end_date',
                'attendance_end_time',
                'attendance_start_state',
                'attendance_end_state',
                'rest_start_time',
                'rest_end_time',
            ],
            include: [
                {
                    model: user,
                    attributes: ['user_name'],
                    required: true,
                    include: [
                        {
                            model: company,
                            required: true,
                            where: { company_code: company_code },
                        },
                    ],
                },
            ],
            where: {
                attendance_start_date: {
                    [Op.between]: [startDay, endDay]
                }
            }
        })
        return result;
    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    attendanceRegister,
    attendanceToday,
    attendanceUpdate,
    attendanceDay,
}