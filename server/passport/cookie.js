const passport = require("passport");
const login = require("./login");
const { user, userInfo } = require("../models");
module.exports = async () => {
  try {
    await passport.serializeUser((user, done) => {

      process.nextTick(() => {
        done(null, { user_id: user.user_id });
      })
    });

    await passport.deserializeUser(async (data, done) => {
      console.log("data", data)
      try {
        const user_r = await user.findOne({
          attributes: ["user_code", "auth_code", "company_code"],
          include: [
            {
              model: userInfo,
              attributes: ["user_name"],
              required: true
            }
          ],
          where: { user_id: data.user_id },
        });
        console.log("user_r", user_r)

        if (!user_r) {
          return done(null, false); // 사용자를 찾지 못했을 때, false 반환 (세션 종료)
        }
        done(null, user_r);
      } catch (error) {
        console.error(error);
        done(error);
      }
    });

    login();
    passport._debug = true;  // 디버깅 활성화

  } catch (error) {
    console.error(error)
  }

};



passport._debug = true;