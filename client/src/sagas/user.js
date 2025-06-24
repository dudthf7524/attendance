import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,

    USER_CHECK_ID_REQUEST,
    USER_CHECK_ID_SUCCESS,
    USER_CHECK_ID_FAILURE,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,

} from "../reducers/user";
// ✅ 사용자 리스트
function* watchUserList() {
    yield takeLatest(USER_LIST_REQUEST, userList);
}

function userListAPI() {

    return axios.get("/user/list");
}

function* userList() {
    try {
        const result = yield call(userListAPI);
        yield put({
            type: USER_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserCheckId() {
    yield takeLatest(USER_CHECK_ID_REQUEST, userCheckId);
}

function userCheckIdAPI(data) {

    return axios.post("/user/check/id", data);
}

function* userCheckId(action) {
    try {
        const result = yield call(userCheckIdAPI, action.data);
        yield put({
            type: USER_CHECK_ID_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_CHECK_ID_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserRegister() {
    yield takeLatest(USER_REGISTER_REQUEST, userRegister);
}

function userRegisterAPI(data) {

    return axios.post("/user/register", data);
}

function* userRegister(action) {
    try {
        const result = yield call(userRegisterAPI, action.data);
        yield put({
            type: USER_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            window.location.href = "/admin/employee/list";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* userSaga() {
    yield all([
        fork(watchUserList), fork(watchUserCheckId), fork(watchUserRegister),
    ]);
}