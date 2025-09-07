const { user, auth, userInfo } = require("../models");
const bcrypt = require('bcrypt');

const userJoin = async (data, company_code, transaction) => {
    try {
        const result = await user.create({
            user_id: data.user_id,
            user_password: data.user_password,
            auth_code: "A1",
            company_code: company_code,
        }, {
            transaction, // 트랜잭션 적용
            raw: true,
        });
        return result.user_code;
    } catch (error) {
        console.error("❌ userJoin error:", error);
        throw error; // rollback 되도록 에러 다시 던짐
    }
};

const userLogin = async (user_id, user_password) => {
    try {
        const result = await user.findOne({ where: { user_id: user_id }, raw: true })
        const isMatch = await bcrypt.compare(user_password, result.user_password);

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
            attributes: ['user_code', 'company_code'],
            include: [
                {
                    model: auth,
                    attributes: ['auth_code', 'auth_name'], // work_pattern 테이블에서 필요한 컬럼 선택
                    required: true,
                },
                {
                    model: userInfo,
                    attributes: ['user_name', 'user_nickname', 'user_hire_date', 'user_position'], // work_pattern 테이블에서 필요한 컬럼 선택
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

const userRegister = async (data, company_code, transaction) => {
    try {
        const result = await user.create({
            user_id: data.user_id,
            user_password: data.user_password,
            company_code: company_code,
        }, {
            transaction, // 트랜잭션 적용
            raw: true,
        });
        return result.user_code;
    } catch (error) {
        console.error(error);
    }
};

const userEdit = async (data) => {
    console.log("data", data)

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

const findByUserId = async (user_id) => {
    try {
        const result = await user.findOne({ where: { user_id: user_id }, raw: true });
        return result
    } catch (error) {
        console.error(error);
    }
};

const userDetail = async (user_code) => {
    console.log("user_code", user_code)
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
    userDetail,
    findByUserId
};