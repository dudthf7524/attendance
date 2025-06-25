import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    TIME_REGISTER_REQUEST,
    TIME_REGISTER_SUCCESS,
    TIME_REGISTER_FAILURE,

    TIME_LIST_OUTER_REQUEST,
    TIME_LIST_OUTER_SUCCESS,
    TIME_LIST_OUTER_FAILURE,

    TIME_LIST_INNER_REQUEST,
    TIME_LIST_INNER_SUCCESS,
    TIME_LIST_INNER_FAILURE,

    TIME_EDIT_REQUEST,
    TIME_EDIT_SUCCESS,
    TIME_EDIT_FAILURE,

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
            window.location.href = "/admin/time/list"
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTimeListOuter() {
    yield takeLatest(TIME_LIST_OUTER_REQUEST, timeListOuter);
}

function timeListOuterAPI() {

    return axios.get("/time/list/outer");
}

function* timeListOuter() {
    try {
        const result = yield call(timeListOuterAPI);
        yield put({
            type: TIME_LIST_OUTER_SUCCESS,
            data: result.data,
        });

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_LIST_OUTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTimeListInner() {
    yield takeLatest(TIME_LIST_INNER_REQUEST, timeListInner);
}

function timeListInnerAPI() {

    return axios.get("/time/list/inner");
}

function* timeListInner() {
    try {
        const result = yield call(timeListInnerAPI);
        yield put({
            type: TIME_LIST_INNER_SUCCESS,
            data: result.data,
        });

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_LIST_INNER_FAILURE,
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
            window.location.href = "/admin/time/list";
        }

    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_EDIT_FAILURE,
            error: err.response.data,
        });
    }
}




export default function* timeSaga() {
    yield all([
        fork(watchTimeRegister),
        fork(watchTimeListOuter),
        fork(watchTimeListInner),
        fork(watchTimeEdit),
    ]);
}