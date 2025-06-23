import produce from "../util/produce";

export const initialState = {
    auth_Loading: false,
    auth_done: false,
    auth_error: null,
    auth: null,

};

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case AUTH_REQUEST:
                draft.auth_Loading = true;
                draft.auth_error = null;
                draft.auth_done = false;
                break;
            case AUTH_SUCCESS:
                draft.auth_Loading = false;
                draft.auth = action.data;
                draft.auth_done = true;
                break;
            case AUTH_FAILURE:
                draft.auth_Loading = false;
                draft.auth_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;