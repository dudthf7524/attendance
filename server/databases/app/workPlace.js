const { workPlace } = require("../../models");

const workPlaceDetail = async (company_code) => {
    try {
        const result = await workPlace.findOne({
            where: {
                company_code: company_code,
            },
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    workPlaceDetail,
};