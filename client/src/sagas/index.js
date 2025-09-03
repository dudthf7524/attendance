import { all, fork } from "redux-saga/effects";
import axios from "axios";
import { API_URL } from "../constant/Constants";
import loginSaga from "./login";
import authSaga from "./auth";
import userSaga from "./user";
import timeSaga from "./time";
import workPlaceSaga from "./workplace";
import attendanceSaga from "./attendance";
import companySaga from "./company";
import emailSaga from "./email";
import joinSaga from "./join";
import logoutSaga from "./logout";
import vacationSaga from "./vacation";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(authSaga),
        fork(userSaga),
        fork(timeSaga),
        fork(workPlaceSaga),
        fork(attendanceSaga),
        fork(companySaga),
        fork(emailSaga),
        fork(joinSaga),
        fork(logoutSaga),
        fork(vacationSaga),
    ]);
}