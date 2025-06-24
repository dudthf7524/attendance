import { combineReducers } from "redux";
import login from "./login";
import auth from "./auth";
import user from "./user";
import time from "./time";

const rootReducer = combineReducers({
    login,
    auth,
    user,
    time
});

export default rootReducer;