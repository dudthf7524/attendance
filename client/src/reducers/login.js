import produce from "../util/produce";

export const initialState = {
    login_Loading: false,
    login_done: false,
    login_error: null,
    login: null,

};

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOGIN_REQUEST:
                draft.login_Loading = true;
                draft.login_error = null;
                draft.login_done = false;
                break;
            case LOGIN_SUCCESS:
                draft.login_Loading = false;
                draft.login = action.data;
                draft.login_done = true;
                break;
            case LOGIN_FAILURE:
                draft.login_Loading = false;
                draft.login_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;