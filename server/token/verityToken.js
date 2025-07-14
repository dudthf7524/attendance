const jwt = require("jsonwebtoken");
const jwtSecret = "JWT_SECRET";

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "토큰이 없습니다." });
    }
    try {
        const data = jwt.verify(
            req.headers.authorization.replace("Bearer ", ""),
            jwtSecret
        );
        res.locals.user_code = data.user_code;
        res.locals.company_code = data.company_code;

        
    } catch (error) {
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