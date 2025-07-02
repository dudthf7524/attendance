const { user, auth } = require("../models");
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');

const userJoin = async (data, company_code) => {
    const today = dayjs().format('YYYY-MM-DD');
    try {
        const result = await user.create({
            user_id: data.user_id,
            user_name: data.user_name,
            user_password: data.user_password,
            user_nickname: "boss",
            user_hire_date: today,
            user_position: "대표",
            auth_code: "A1",
            company_code: company_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

const userLogin = async (user_id, user_password) => {
    try {
        const result = await user.findOne({ where: { user_id: user_id }, raw: true })
        const isMatch = await bcrypt.compare(user_password, result.user_password);
        console.log(isMatch)

        if (result) {
            if (isMatch) {
                return result;
            } else {
                return 0;
            }
        } else {
            return -1
        }
    } catch (error) {
        console.error(error);
    }
};

const userList = async (company_code) => {
    try {
        const result = await user.findAll({
            attributes: ['user_code', 'user_id', 'user_name', 'user_nickname', 'user_hire_date', 'user_position'],
            include: [
                {
                    model: auth,
                    attributes: ['auth_code', 'auth_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true,
                },
            ],
            where: { company_code: company_code },

        })

        console.log(result)

        return result;


    } catch (error) {
        console.error(error);
    }
};

const userCheckId = async (data) => {
    try {
        const result = await user.findOne({ where: { user_id: data.user_id } })
        if (result) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error(error);
    }

};

const userRegister = async (data, company_code) => {
    try {
        const result = await user.create({
            user_id: data.user_id,
            user_password: data.user_password,
            user_name: data.user_name,
            user_nickname: data.user_nickname,
            auth_code: data.auth_code,
            user_hire_date: data.user_hire_date,
            user_position: data.user_position,
            company_code: company_code,
            raw: true
        });
        return result
    } catch (error) {
        console.error(error);
    }
};

const userEdit = async (data) => {
    console.log(data)

    try {
        const result = await user.update(
            {
                user_name: data.user_name,
                user_nickname: data.user_nickname,
                user_position: data.user_position,
                user_hire_date: data.user_hire_date
            },
            {
                where: { user_code: data.user_code }
            }
        )
        return result;
    } catch (error) {
        console.error(error);
    }
};

const userDelete = async (data) => {
    console.log(data)

    try {
        const result = await user.destroy({
            where: { user_code: data.user_code },
        });
        return result;
    } catch (error) {
        console.error(error);
    }
};

const findByEmail = async (user_id) => {
    try {
        const result = await user.findOne({ where: { user_id: user_id }, raw: true });
        return result
    } catch (error) {
        console.error(error);
    }
};


const userDetail = async (user_code) => {
    try {
        const result = await user.findOne({ where: { user_code: user_code } })
        return result;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    userJoin,
    userLogin,
    userList,
    userCheckId,
    userRegister,
    userEdit,
    userDelete,
    findByEmail,
    userDetail
};