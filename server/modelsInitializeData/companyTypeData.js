const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const companyTypeDatass = [
    { company_type_code: "C", company_type_name: "제조업" },
    { company_type_code: "G", company_type_name: "도소매업" },
    { company_type_code: "S", company_type_name: "서비스업" },
    { company_type_code: "F", company_type_name: "건설업" },
    { company_type_code: "K", company_type_name: "금융업" },
    { company_type_code: "A", company_type_name: "농업/임업/어업" },
    { company_type_code: "J", company_type_name: "정보통신업" },
    { company_type_code: "R", company_type_name: "문화·예술·오락업" },
    { company_type_code: "P", company_type_name: "학문·교육업" },
    { company_type_code: "M", company_type_name: "전문·과학·기술 서비스업" },
    { company_type_code: "Q", company_type_name: "보건업" },
    { company_type_code: "Q2", company_type_name: "사회복지 서비스업" },
    { company_type_code: "H", company_type_name: "운송업" },
    { company_type_code: "I", company_type_name: "숙박업" },
    { company_type_code: "I2", company_type_name: "음식·음료업" },
];

const authData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.companyType.count();
        if (count > 0) {
            console.log("초기 companyType 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            companyTypeDatass.map((companyTypeDatas) => {
                return db.companyType.create(companyTypeDatas);
            })
        );
        console.log("✅ 초기 companyType 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 companyType 초기화 중 오류:", error);
    }
};

module.exports = authData;
