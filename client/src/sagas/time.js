import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    TIME_REGISTER_REQUEST,
    TIME_REGISTER_SUCCESS,
    TIME_REGISTER_FAILURE,

    TIME_VIEW_REQUEST,
    TIME_VIEW_SUCCESS,
    TIME_VIEW_FAILURE,

    TIME_EDIT_REQUEST,
    TIME_EDIT_SUCCESS,
    TIME_EDIT_FAILURE,

    TIME_DETAIL_REQUEST,
    TIME_DETAIL_SUCCESS,
    TIME_DETAIL_FAILURE,

} from "../reducers/time";

function* watchTimeRegister() {
    yield takeLatest(TIME_REGISTER_REQUEST, timeRegister);
}

function timeRegisterAPI(data) {

    return axios.post("/time/register", data);
}

function* timeRegister(action) {
    try {
        const result = yield call(timeRegisterAPI, action.data);
        yield put({
            type: TIME_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert("시간등록이 완료되었습니다.")
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTimeView() {
    yield takeLatest(TIME_VIEW_REQUEST, timeView);
}

function timeViewAPI(data) {
    return axios.get("/time/view", { params: data });
}

function* timeView(action) {
    try {
        const result = yield call(timeViewAPI, action.data);
        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
            return;
        }
        yield put({
            type: TIME_VIEW_SUCCESS,
            data: result.data,
        });

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_VIEW_FAILURE,
            error: err.response.data,
        });
    }
}



function* watchTimeEdit() {
    yield takeLatest(TIME_EDIT_REQUEST, timeEdit);
}

function timeEditAPI(data) {

    return axios.post("/time/edit", data);
}

function* timeEdit(action) {
    try {
        const result = yield call(timeEditAPI, action.data);
        yield put({
            type: TIME_EDIT_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('시간 수정이 완료되었습니다.')
        }

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_EDIT_FAILURE,
            error: err.response.data,
        });
    }
}



function* watchTimeDetail() {
    yield takeLatest(TIME_DETAIL_REQUEST, timeDetail);
}

function timeDetailAPI(data) {

    return axios.get("/time/detail", { params: data });
}

function* timeDetail(action) {
    try {
        const result = yield call(timeDetailAPI, action.data);
        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
            return;
        }
        yield put({
            type: TIME_DETAIL_SUCCESS,
            data: result.data,
        });

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_DETAIL_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* timeSaga() {
    yield all([
        fork(watchTimeRegister),
        fork(watchTimeView),
        fork(watchTimeEdit),
        fork(watchTimeDetail),
    ]);
}