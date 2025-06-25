import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    WORK_PLACE_REGISTER_REQUEST,
    WORK_PLACE_REGISTER_SUCCESS,
    WORK_PLACE_REGISTER_FAILURE,
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
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_PLACE_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* workPlaceSaga() {
    yield all([
        fork(watchWorkPlaceRegister),
    ]);
}