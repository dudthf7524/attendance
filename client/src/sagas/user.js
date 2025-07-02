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

    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAILURE,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,

    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAILURE,

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
            alert("직원이 등록되었습니다.")
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

function* watchUserEdit() {
    yield takeLatest(USER_EDIT_REQUEST, userEdit);
}

function userEditAPI(data) {

    return axios.post("/user/edit", data);
}

function* userEdit(action) {
    try {
        const result = yield call(userEditAPI, action.data);
        yield put({
            type: USER_EDIT_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert("직원정보가 수정되었습니다.")
            window.location.href = "/admin/employee/list";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_EDIT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserDelete() {
    yield takeLatest(USER_DELETE_REQUEST, userDelete);
}

function userDeleteAPI(data) {

    return axios.post("/user/delete", data);
}

function* userDelete(action) {
    try {
        const result = yield call(userDeleteAPI, action.data);
        yield put({
            type: USER_DELETE_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert("직원이 삭제되었습니다.")
            window.location.href = "/admin/employee/list";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_DELETE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserDetail() {
    yield takeLatest(USER_DETAIL_REQUEST, userDetail);
}

function userDetailAPI() {

    return axios.get("/user/detail");
}

function* userDetail() {
    try {
        const result = yield call(userDetailAPI);
        yield put({
            type: USER_DETAIL_SUCCESS,
            data: result.data,
        });
        if (result.data === 'common') {
            alert('쿠키가 만료되어 로그인이 필요합니다.')
            window.location.href = "/login";
            return;
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_DETAIL_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* userSaga() {
    yield all([
        fork(watchUserList),
        fork(watchUserCheckId),
        fork(watchUserRegister),
        fork(watchUserEdit),
        fork(watchUserDelete),
        fork(watchUserDetail),
    ]);
}