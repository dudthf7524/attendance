import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
} from "../reducers/auth";

function* watchAuth() {
    yield takeLatest(AUTH_REQUEST, Auth);
}

function AuthAPI() {

    return axios.get("/auth");
}

function* Auth() {
    try {
        const result = yield call(AuthAPI);
        yield put({
            type: AUTH_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: AUTH_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* authSaga() {
    yield all([
        fork(watchAuth),
    ]);
}