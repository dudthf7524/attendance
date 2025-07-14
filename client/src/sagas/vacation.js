import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    VACATION_LIST_REQUEST,
    VACATION_LIST_SUCCESS,
    VACATION_LIST_FAILURE,

    VACATION_APPROVAL_REQUEST,
    VACATION_APPROVAL_SUCCESS,
    VACATION_APPROVAL_FAILURE,

    VACATION_REJECT_REQUEST,
    VACATION_REJECT_SUCCESS,
    VACATION_REJECT_FAILURE,

} from "../reducers/vacation";




// ✅ 사용자 로그인
function* watchVacationList() {
    yield takeLatest(VACATION_LIST_REQUEST, VacationList);
}

function VacationListAPI(data) {

    return axios.get("/vacation/list", data);
}

function* VacationList(action) {
    try {
        const result = yield call(VacationListAPI, action.data);
        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
            return;
        }
        yield put({
            type: VACATION_LIST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: VACATION_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchVacationApproval() {
    yield takeLatest(VACATION_APPROVAL_REQUEST, VacationApproval);
}

function VacationApprovalAPI(data) {

    return axios.post("/vacation/approval", data);
}

function* VacationApproval(action) {
    try {
        const result = yield call(VacationApprovalAPI, action.data);
        yield put({
            type: VACATION_APPROVAL_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('승인되었습니다.')
            window.location.href = "/admin/vacation/approval";
        }

    } catch (err) {
        console.error(err);
        yield put({
            type: VACATION_APPROVAL_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchVacationReject() {
    yield takeLatest(VACATION_REJECT_REQUEST, VacationReject);
}

function VacationRejectAPI(data) {

    return axios.post("/vacation/reject", data);
}

function* VacationReject(action) {
    try {
        const result = yield call(VacationRejectAPI, action.data);
        yield put({
            type: VACATION_REJECT_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('거절되었습니다.')
            window.location.href = "/admin/vacation/approval";
        }

    } catch (err) {
        console.error(err);
        yield put({
            type: VACATION_REJECT_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* vacationSaga() {
    yield all([
        fork(watchVacationList),
        fork(watchVacationApproval),
        fork(watchVacationReject),
    ]);
}