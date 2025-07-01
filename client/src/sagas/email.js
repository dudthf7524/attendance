import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    EMAIL_CHECK_REQUEST,
    EMAIL_CHECK_SUCCESS,
    EMAIL_CHECK_FAILURE,
} from "../reducers/email";

function* watchEmailCheck() {
    yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function emailCheckAPI(data) {

    return axios.post("/email/check", data);
}

function* emailCheck(action) {
    try {
        const result = yield call(emailCheckAPI, action.data);
        yield put({
            type: EMAIL_CHECK_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: EMAIL_CHECK_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* emailSaga() {
    yield all([
        fork(watchEmailCheck),
    ]);
}