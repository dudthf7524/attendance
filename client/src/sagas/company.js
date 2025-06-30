import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    COMPANY_NUMBER_REQUEST,
    COMPANY_NUMBER_SUCCESS,
    COMPANY_NUMBER_FAILURE,
} from "../reducers/company";

function* watchCompanyNumber() {
    yield takeLatest(COMPANY_NUMBER_REQUEST, companyNumber);
}

function companyNumberAPI(data) {

    return axios.post("/company/number", data);
}

function* companyNumber(action) {
    try {
        const result = yield call(companyNumberAPI, action.data);
        yield put({
            type: COMPANY_NUMBER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANY_NUMBER_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* companySaga() {
    yield all([
        fork(watchCompanyNumber),
    ]);
}