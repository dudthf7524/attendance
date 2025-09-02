import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    ATTENDANCE_REGISTER_REQUEST,
    ATTENDANCE_REGISTER_SUCCESS,
    ATTENDANCE_REGISTER_FAILURE,

    ATTENDANCE_TODAY_REQUEST,
    ATTENDANCE_TODAY_SUCCESS,
    ATTENDANCE_TODAY_FAILURE,

    ATTENDANCE_EDIT_REQUEST,
    ATTENDANCE_EDIT_SUCCESS,
    ATTENDANCE_EDIT_FAILURE,

    ATTENDANCE_SEARCH_REQUEST,
    ATTENDANCE_SEARCH_SUCCESS,
    ATTENDANCE_SEARCH_FAILURE,

    ATTENDANCE_LIST_REQUEST,
    ATTENDANCE_LIST_SUCCESS,
    ATTENDANCE_LIST_FAILURE,

} from "../reducers/attendance";

function* watchAttendanceRegister() {
    yield takeLatest(ATTENDANCE_REGISTER_REQUEST, attendanceRegister);
}

function attendanceRegisterAPI(data) {

    return axios.post("/attendance/register", data);
}

function* attendanceRegister(action) {
    try {
        const result = yield call(attendanceRegisterAPI, action.data);

        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
        }
        if (result.data) {
            window.location.href = "/attendance";
        }
        yield put({
            type: ATTENDANCE_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCE_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceToday() {
    yield takeLatest(ATTENDANCE_TODAY_REQUEST, attendanceToday);
}

function attendanceTodayAPI() {

    return axios.get("/attendance/today");
}

function* attendanceToday() {
    try {
        const result = yield call(attendanceTodayAPI);

        if (result.data === 'common') {
            window.location.href = "/";
            return;
        }
        yield put({
            type: ATTENDANCE_TODAY_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCE_TODAY_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceEdit() {
    yield takeLatest(ATTENDANCE_EDIT_REQUEST, attendanceEdit);
}

function attendanceEditAPI(data) {

    return axios.post("/attendance/edit", data);
}

function* attendanceEdit(action) {
    try {
        const result = yield call(attendanceEditAPI, action.data);

        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
            return;
        }
        if (result.data) {
            alert('시간 수정이 완료되었습니다.')
            window.location.href = "/admin/attendance";
        }
        yield put({
            type: ATTENDANCE_EDIT_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCE_EDIT_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceSearch() {
    yield takeLatest(ATTENDANCE_SEARCH_REQUEST, attendanceSearch);
}

function attendanceSearchAPI(data) {

    return axios.get("/attendance/search", { params: data });
}

function* attendanceSearch(action) {
    try {
        const result = yield call(attendanceSearchAPI, action.data);

        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
        }
        yield put({
            type: ATTENDANCE_SEARCH_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCE_SEARCH_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceList() {
    yield takeLatest(ATTENDANCE_LIST_REQUEST, attendanceList);
}

function attendanceListAPI(data) {

    return axios.get("/attendance/list", { params: data });
}

function* attendanceList(action) {
    try {
        const result = yield call(attendanceListAPI, action.data);

        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
        }
        yield put({
            type: ATTENDANCE_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCE_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* attendanceSaga() {
    yield all([
        fork(watchAttendanceRegister),
        fork(watchAttendanceToday),
        fork(watchAttendanceEdit),
        fork(watchAttendanceSearch),
        fork(watchAttendanceList),
    ]);
} 