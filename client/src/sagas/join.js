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
        if(result.status === 201){
            alert(result.data?.message || "성공했습니다.");
            window.location.href = "/login";
        }
        yield put({
            type: JOIN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (err.response.status === 500) {
            alert(err.response.data?.message || '서버 오류가 발생했습니다.');
        }
        yield put({
            type: JOIN_FAILURE,
            error: err.response.data?.message, 
        });
    }

}



export default function* joinSaga() {
    yield all([
        fork(watchJoin),
    ]);
}