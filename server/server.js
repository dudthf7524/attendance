const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize, attendance } = require('./models');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const passportConfig = require("./passport/cookie");
const passport = require("passport");
const session = require("express-session");

const app = express();
const port = 3070;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const timeRoutes = require('./routes/time');
const workPlaceRoutes = require('./routes/workPlace');
const attendanceRoutes = require('./routes/attendance');
const companyRoutes = require('./routes/company');



const authData = require("./modelsInitializeData/authData");

passportConfig();
app.use(express.json());

// CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://www.washstation.shop/'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("✅ 데이터베이스 연결 성공");

    // 데이터를 순차적으로 삽입하여 충돌 방지
    try {
      await authData();
      console.log("✅ authData 삽입 완료");

    } catch (error) {
      console.error("❌ 초기 데이터 삽입 실패:", error);
    }

    // 서버 실행
    app.listen(port, () => {
      console.log(`🚀 http://localhost:${port} 에서 서버 실행중`);
    });
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패:", err);
  });

app.use(
  session({
    secret: "암호화에 쓸 비번", // 세션 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 접근하지 못하도록
      secure: false, // HTTPS에서만 작동하도록 설정
      maxAge: 24 * 60 * 60 * 1000, // 쿠키 만료 시간 설정 (1일)
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static(path.join(__dirname, "../client/build")));

// 루트 요청 시 index.html 반환
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/time', timeRoutes);
app.use('/work/place', workPlaceRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/company', companyRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});




