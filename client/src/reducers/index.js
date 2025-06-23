import { combineReducers } from "redux";
import login from "./login";
import auth from "./auth";

const rootReducer = combineReducers({
    login,
    auth
});

export default rootReducer;