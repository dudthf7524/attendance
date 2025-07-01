import produce from "../util/produce";

export const initialState = {
    email_check_Loading: false,
    email_check_done: false,
    email_check_error: null,
    emailCheck: null,

};

export const EMAIL_CHECK_REQUEST = "EMAIL_CHECK_REQUEST";
export const EMAIL_CHECK_SUCCESS = "EMAIL_CHECK_SUCCESS";
export const EMAIL_CHECK_FAILURE = "EMAIL_CHECK_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case EMAIL_CHECK_REQUEST:
                draft.email_check_Loading = true;
                draft.email_check_error = null;
                draft.email_check_done = false;
                break;
            case EMAIL_CHECK_SUCCESS:
                draft.email_check_Loading = false;
                draft.emailCheck = action.data;
                draft.email_check_done = true;
                break;
            case EMAIL_CHECK_FAILURE:
                draft.email_check_Loading = false;
                draft.email_check_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;