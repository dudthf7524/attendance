import { combineReducers } from "redux";
import login from "./login";
import auth from "./auth";
import user from "./user";
import time from "./time";
import workplace from "./workplace";
import attendance from "./attendance";

const rootReducer = combineReducers({
    login,
    auth,
    user,
    time,
    workplace,
    attendance
});

export default rootReducer;