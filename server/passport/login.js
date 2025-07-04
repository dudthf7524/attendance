const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const user = require('../databases/user');

module.exports = () => {

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: "user_id",
                passwordField: "user_password",
                passReqToCallback: true,
            },
            async (req, user_id, user_password, done, res) => {
                console.log(user_id)
                console.log(user_password)
                try {
                    const result = await user.userLogin(user_id, user_password);
                    if (result === -1) {
                        return req.res.json(result);
                    } else if (result === 0) {
                        return req.res.json(result);
                    } else if (result.user_id) {
                        return done(null, result);
                    }
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
