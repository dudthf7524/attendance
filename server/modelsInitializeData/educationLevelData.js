const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const educationLevelss = [
    { education_level_code: "ML", education_level_name: "중학교" },
    { education_level_code: "HS", education_level_name: "고등학교" },
    { education_level_code: "AD", education_level_name: "전문대학" },
    { education_level_code: "UG", education_level_name: "대학교" },
    { education_level_code: "GR", education_level_name: "대학원" },
];

const educationLevelData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.educationLevel.count();
        if (count > 0) {
            console.log("초기 부서 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            educationLevelss.map((educationLevels) => {
                return db.educationLevel.create(educationLevels);
            })
        );
        console.log("✅ 초기 부서 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 department 초기화 중 오류:", error);
    }
};

module.exports = educationLevelData;