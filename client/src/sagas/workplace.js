import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    WORK_PLACE_REGISTER_REQUEST,
    WORK_PLACE_REGISTER_SUCCESS,
    WORK_PLACE_REGISTER_FAILURE,

    WORK_PLACE_GET_REQUEST,
    WORK_PLACE_GET_SUCCESS,
    WORK_PLACE_GET_FAILURE,

    WORK_PLACE_EDIT_REQUEST,
    WORK_PLACE_EDIT_SUCCESS,
    WORK_PLACE_EDIT_FAILURE,

} from "../reducers/workplace";

function* watchWorkPlaceRegister() {
    yield takeLatest(WORK_PLACE_REGISTER_REQUEST, workPlaceRegister);
}

function workPlaceRegisterAPI(data) {

    return axios.post("/work/place/register", data);
}

function* workPlaceRegister(action) {
    try {
        const result = yield call(workPlaceRegisterAPI, action.data);
        yield put({
            type: WORK_PLACE_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('근무지 설정 완료')
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_PLACE_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchWorkPlaceGet() {
    yield takeLatest(WORK_PLACE_GET_REQUEST, workPlaceGet);
}

function workPlaceGetAPI() {

    return axios.get("/work/place/get");
}

function* workPlaceGet(action) {
    try {
        const result = yield call(workPlaceGetAPI, action.data);
        yield put({
            type: WORK_PLACE_GET_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_PLACE_GET_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchWorkPlaceEdit() {
    yield takeLatest(WORK_PLACE_EDIT_REQUEST, workPlaceEdit);
}

function workPlaceEditAPI(data) {

    return axios.post("/work/place/edit", data);
}

function* workPlaceEdit(action) {
    try {
        const result = yield call(workPlaceEditAPI, action.data);
        yield put({
            type: WORK_PLACE_EDIT_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('근무지 수정이 완료되었습니다')
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_PLACE_EDIT_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* workPlaceSaga() {
    yield all([
        fork(watchWorkPlaceRegister),
        fork(watchWorkPlaceGet),
        fork(watchWorkPlaceEdit),
    ]);
}