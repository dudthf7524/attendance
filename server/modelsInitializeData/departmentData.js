const db = require("../models/index"); // Sequelize 모델이 정의된 index.js 파일

const departmentss = [
    { department_code: "PLANNING", department_name: "기획" },
    { department_code: "HR", department_name: "인사" },
    { department_code: "SALES", department_name: "영업" },
    { department_code: "DEV", department_name: "개발" },
    { department_code: "DESIGN", department_name: "디자인" },
    { department_code: "FINANCE", department_name: "재무" },
    { department_code: "PRODUCTION", department_name: "생산" },
    { department_code: "CS", department_name: "고객센터" },
    { department_code: "LEGAL", department_name: "법무" },
    { department_code: "LOGISTICS", department_name: "물류" },
];

const departmentData = async () => {
    try {
        // 데이터베이스에 기존 데이터가 있는지 확인
        const count = await db.department.count();
        if (count > 0) {
            console.log("초기 부서 데이터가 이미 삽입되어 있습니다.");
            return; // 데이터가 있으면 추가 작업을 하지 않음
        }

        // 초기 데이터 삽입
        await Promise.all(
            departmentss.map((departments) => {
                return db.department.create(departments);
            })
        );
        console.log("✅ 초기 부서 데이터 삽입 완료");
    } catch (error) {
        console.error("데이터베이스 department 초기화 중 오류:", error);
    }
};

module.exports = departmentData;
