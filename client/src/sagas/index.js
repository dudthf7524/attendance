import { all, fork } from "redux-saga/effects";
import axios from "axios";
import { API_URL } from "../constant/contants";
import loginSaga from "./login";
import authSaga from "./auth";
import userSaga from "./user";
import timeSaga from "./time";
import workPlaceSaga from "./workplace";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(authSaga),
        fork(userSaga),
        fork(timeSaga),
        fork(workPlaceSaga),
    ]);
}