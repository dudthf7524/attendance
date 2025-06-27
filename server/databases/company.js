const { company } = require("../models");

const companyRegister = async (data) => {
    try {
        const result = await company.create({
            company_name: data.company_name,
            company_number: data.company_number,
            company_type: data.company_type,
            company_count: data.company_count,
            company_ceo_name: data.company_ceo_name,
            company_ceo_phone: data.company_ceo_phone,
            raw: true
        });
        return result.company_code;
    } catch (error) {
        console.error(error);
    }

};

module.exports = {
    companyRegister,

};