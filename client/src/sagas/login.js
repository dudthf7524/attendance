import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from "../reducers/login";
import toast from "react-hot-toast";




// ✅ 사용자 로그인
function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, Login);
}

function LoginAPI(data) {

    return axios.post("/login", data);
}

function* Login(action) {
    try {
        const result = yield call(LoginAPI, action.data);

        if (result.data === -1) {
            yield put({
                type: LOGIN_FAILURE,
                error: result.data,
            });
            return;
        }
        if (result.data === 0) {
            yield put({
                type: LOGIN_FAILURE,
                error: result.data,
            });
            return;
        }

        if (result.data) {
            yield put({
                type: LOGIN_SUCCESS,
                payload: result.data,
            });
            // alert('로그인이 완료되었습니다.')
            // toast.success('로그인이 완료되었습니다!', { position: 'top-center' });
            // window.location.href = "/login/sucess"
        }


    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* loginSaga() {
    yield all([
        fork(watchLogin),
    ]);
}