import produce from "../util/produce";

export const initialState = {
    attendance_register_Loading: false,
    attendance_register_done: false,
    attendance_register_error: null,

    attendance_today_Loading: false,
    attendance_today_done: false,
    attendance_today_error: null,

    attendance_update_Loading: false,
    attendance_update_done: false,
    attendance_update_error: null,

    attendanceToday: null,
};

export const ATTENDANCE_REGISTER_REQUEST = "ATTENDANCE_REGISTER_REQUEST";
export const ATTENDANCE_REGISTER_SUCCESS = "ATTENDANCE_REGISTER_SUCCESS";
export const ATTENDANCE_REGISTER_FAILURE = "ATTENDANCE_REGISTER_FAILURE";

export const ATTENDANCE_TODAY_REQUEST = "ATTENDANCE_TODAY_REQUEST";
export const ATTENDANCE_TODAY_SUCCESS = "ATTENDANCE_TODAY_SUCCESS";
export const ATTENDANCE_TODAY_FAILURE = "ATTENDANCE_TODAY_FAILURE";

export const ATTENDANCE_UPDATE_REQUEST = "ATTENDANCE_UPDATE_REQUEST";
export const ATTENDANCE_UPDATE_SUCCESS = "ATTENDANCE_UPDATE_SUCCESS";
export const ATTENDANCE_UPDATE_FAILURE = "ATTENDANCE_UPDATE_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ATTENDANCE_REGISTER_REQUEST:
                draft.attendance_register_Loading = true;
                draft.attendance_register_error = null;
                draft.attendance_register_done = false;
                break;
            case ATTENDANCE_REGISTER_SUCCESS:
                draft.attendance_register_Loading = false;
                draft.attendance_register_done = true;
                break;
            case ATTENDANCE_REGISTER_FAILURE:
                draft.attendance_register_Loading = false;
                draft.attendance_register_error = action.error;
                break;
            case ATTENDANCE_TODAY_REQUEST:
                draft.attendance_today_Loading = true;
                draft.attendance_today_error = null;
                draft.attendance_today_done = false;
                break;
            case ATTENDANCE_TODAY_SUCCESS:
                draft.attendance_today_Loading = false;
                draft.attendanceToday = action.data;
                draft.attendance_today_done = true;
                break;
            case ATTENDANCE_TODAY_FAILURE:
                draft.attendance_today_Loading = false;
                draft.attendance_today_error = action.error;
                break;
            case ATTENDANCE_UPDATE_REQUEST:
                draft.attendance_update_Loading = true;
                draft.attendance_update_error = null;
                draft.attendance_update_done = false;
                break;
            case ATTENDANCE_UPDATE_SUCCESS:
                draft.attendance_update_Loading = false;
                draft.attendanceToday = action.data;
                draft.attendance_update_done = true;
                break;
            case ATTENDANCE_UPDATE_FAILURE:
                draft.attendance_update_Loading = false;
                draft.attendance_update_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;