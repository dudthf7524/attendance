import { combineReducers } from "redux";
import login from "./login";
import auth from "./auth";
import user from "./user";
import time from "./time";
import workplace from "./workplace";
import attendance from "./attendance";
import company from "./company";
import email from "./email";
import logout from "./logout";
import join from "./join";


const rootReducer = combineReducers({
    login,
    auth,
    user,
    time,
    workplace,
    attendance,
    company,
    email,
    logout,
    join
});

export default rootReducer;