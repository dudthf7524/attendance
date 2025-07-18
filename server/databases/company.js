const { company } = require("../models");

const companyRegister = async (data, transaction) => {
    try {
        const result = await company.create({
            company_name: data.company_name,
            company_number: data.company_number,
            company_type: data.company_type,
            company_count: data.company_count,
            company_ceo_name: data.company_ceo_name,
            company_ceo_phone: data.company_ceo_phone,
        }, {
            transaction,  // 트랜잭션 적용
            raw: true
        });

        return result.company_code;
    } catch (error) {
        console.error("❌ companyRegister error:", error);
        throw error; // 상위에서 rollback할 수 있도록 에러 다시 던짐
    }
};

module.exports = {
    companyRegister,
};