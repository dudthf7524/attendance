import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    JOIN_REQUEST,
    JOIN_SUCCESS,
    JOIN_FAILURE,
} from "../reducers/join";

// ✅ 사용자 로그인
function* watchJoin() {
    yield takeLatest(JOIN_REQUEST, join);
}

function joinAPI(data) {

    return axios.post("/join", data);
}

function* join(action) {

    try {
        const result = yield call(joinAPI, action.data);
        yield put({
            type: JOIN_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('회원가입이 완료되었습니다.')
            window.location.href = "/login";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: JOIN_FAILURE,
            error: err.response.data,
        });
    }

}



export default function* joinSaga() {
    yield all([
        fork(watchJoin),
    ]);
}