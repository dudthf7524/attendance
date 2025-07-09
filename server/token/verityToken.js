const jwt = require("jsonwebtoken");
const jwtSecret = "JWT_SECRET";


const verifyToken = (req, res, next) => {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "토큰이 없습니다." });
    }
    console.log(jwt.JsonWebTokenError)
    try {
        const data = jwt.verify(
            req.headers.authorization.replace("Bearer ", ""),
            jwtSecret
        );
        console.log('bbb')
        console.log(data)
        console.log('bbb')
        res.locals.user_code = data.user_code;
    } catch (error) {
        console.error(error);
        console.log('에러 종류:', error.name);
        console.log('에러 메시지:', error.message);
        if (error.name === "TokenExpiredError") {
            return res
                .status(419)
                .json({ message: "만료된 액세스 토큰입니다.", code: "expired" });
        }
        return res
            .status(401)
            .json({ message: "유효하지 않은 액세스 토큰입니다." });
    }
    next();
};

module.exports = verifyToken;