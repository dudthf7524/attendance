const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// Sequelize 인스턴스 초기화
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect, // 'mysql', 'postgres', 'sqlite', 'mssql' 중 하나
    logging: false, // 실행되는 SQL 쿼리를 콘솔에 출력
  }
);



// 모든 모델 파일 로드
// fs.readdirSync(__dirname)
//   .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

db.auth = require("./auth")(sequelize, Sequelize);
db.department = require("./department")(sequelize, Sequelize);
db.country = require("./country")(sequelize, Sequelize);
db.educationLevel = require("./educationLevel")(sequelize, Sequelize);
db.companyType = require("./companyType")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.time = require("./time")(sequelize, Sequelize);
db.company = require("./company")(sequelize, Sequelize);
db.workPlace = require("./workPlace")(sequelize, Sequelize);
db.attendance = require("./attendance")(sequelize, Sequelize);
db.vacation = require("./vacation")(sequelize, Sequelize);
db.userInfo = require("./userInfo")(sequelize, Sequelize);



// 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // 관계 설정 호출
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
