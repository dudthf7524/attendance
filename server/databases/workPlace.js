const { workPlace } = require("../models");

const workPlaceRegister = async (data, company_code) => {
    try {
        const result = await workPlace.create({
            address: data.address,
            location_latitude: data.location_latitude,
            location_hardness: data.location_hardness,
            radius: data.radius,
            company_code: company_code,
            raw: true
        });
        return result;
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    workPlaceRegister,
};