import produce from "../util/produce";

export const initialState = {
    vacation_list_Loading: false,
    vacation_list_done: false,
    vacation_list_error: null,

    vacation_approval_Loading: false,
    vacation_approval_done: false,
    vacation_approval_error: null,

    vacation_reject_Loading: false,
    vacation_reject_done: false,
    vacation_reject_error: null,

    vacationList: null,

};

export const VACATION_LIST_REQUEST = "VACATION_LIST_REQUEST";
export const VACATION_LIST_SUCCESS = "VACATION_LIST_SUCCESS";
export const VACATION_LIST_FAILURE = "VACATION_LIST_FAILURE";

export const VACATION_APPROVAL_REQUEST = "VACATION_APPROVAL_REQUEST";
export const VACATION_APPROVAL_SUCCESS = "VACATION_APPROVAL_SUCCESS";
export const VACATION_APPROVAL_FAILURE = "VACATION_APPROVAL_FAILURE";

export const VACATION_REJECT_REQUEST = "VACATION_REJECT_REQUEST";
export const VACATION_REJECT_SUCCESS = "VACATION_REJECT_SUCCESS";
export const VACATION_REJECT_FAILURE = "VACATION_REJECT_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case VACATION_LIST_REQUEST:
                draft.vacation_list_Loading = true;
                draft.vacation_list_error = null;
                draft.vacation_list_done = false;
                break;
            case VACATION_LIST_SUCCESS:
                draft.vacation_list_Loading = false;
                draft.vacationList = action.data;
                draft.vacation_list_done = true;
                break;
            case VACATION_LIST_FAILURE:
                draft.vacation_list_Loading = false;
                draft.vacation_list_error = action.error;
                break;
            case VACATION_APPROVAL_REQUEST:
                draft.vacation_list_Loading = true;
                draft.vacation_list_error = null;
                draft.vacation_list_done = false;
                break;
            case VACATION_APPROVAL_SUCCESS:
                draft.vacation_list_Loading = false;
                draft.vacation_list_done = true;
                break;
            case VACATION_APPROVAL_FAILURE:
                draft.vacation_list_Loading = false;
                draft.vacation_list_error = action.error;
                break;
            case VACATION_REJECT_REQUEST:
                draft.vacation_reject_Loading = true;
                draft.vacation_reject_error = null;
                draft.vacation_reject_done = false;
                break;
            case VACATION_REJECT_SUCCESS:
                draft.vacation_reject_Loading = false;
                draft.vacation_reject_done = true;
                break;
            case VACATION_REJECT_FAILURE:
                draft.vacation_reject_Loading = false;
                draft.vacation_reject_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;