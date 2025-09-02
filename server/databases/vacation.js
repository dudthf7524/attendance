const { vacation, user, userInfo } = require("../models");

const vacationRegister = async (data, user_code, company_code) => {
    console.log('data', data)
    try {
        const result = await vacation.create({
            start_date: data.startDate,
            end_date: data.endDate,
            reason: data.reason,
            user_code: user_code,
            company_code: company_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const vacationList = async (company_code) => {

    try {
        const result = await vacation.findAll({
            attributes: ['vacation_id', 'start_date', 'end_date', 'reason', 'vacation_state'],
            include: [
                {
                    model: user,
                    required: true,
                    attributes: ['user_name'],
                    where: { company_code: company_code },
                },
            ],
        });
        console.log("휴가 리스트", result)
        return result;
    } catch (error) {
        console.error(error);
    }
};

const vacationApproval = async (vacation_id) => {

    try {
        const result = await vacation.update(
            {
                vacation_state: 1
            },
            {
                where: { vacation_id: vacation_id }
            }
        )
        return result;
    } catch (error) {
        console.error(error);
    }
};

const vacationReject = async (vacation_id) => {

    try {
        const result = await vacation.update(
            {
                vacation_state: -1
            },
            {
                where: { vacation_id: vacation_id }
            }
        )
        return result;
    } catch (error) {
        console.error(error);
    }
};

const vacationUserList = async (user_code) => {

    try {
        const result = await vacation.findAll({
            attributes: ['vacation_id', 'start_date', 'end_date', 'reason', 'vacation_state'],
            include: [
                {
                    model: user,
                    required: true,
                    attributes: ['user_code'],
                    where: { user_code: user_code },
                    include: [
                        {
                            model: userInfo,
                            attributes: [
                                'user_name',
                            ],
                            required: true,
                        },
                    ],
                },
            ],
        });
        console.log("휴가 리스트", result)
        return result;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    vacationRegister,
    vacationList,
    vacationApproval,
    vacationReject,
    vacationUserList
};
