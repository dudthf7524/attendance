import produce from "../util/produce";

export const initialState = {
    user_list_Loading: false,
    user_list_done: false,
    user_list_error: null,

    user_check_id_Loading: false,
    user_check_id_done: false,
    user_check_id_error: null,

    user_register_Loading: false,
    user_register_done: false,
    user_register_error: null,

    userList: null,
    userCheckId: null
};

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";

export const USER_CHECK_ID_REQUEST = "USER_CHECK_ID_REQUEST";
export const USER_CHECK_ID_SUCCESS = "USER_CHECK_ID_SUCCESS";
export const USER_CHECK_ID_FAILURE = "USER_CHECK_ID_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case USER_LIST_REQUEST:
                draft.user_list_Loading = true;
                draft.user_list_error = null;
                draft.user_list_done = false;
                break;
            case USER_LIST_SUCCESS:
                draft.user_list_Loading = false;
                draft.userList = action.data;
                draft.user_list_done = true;
                break;
            case USER_LIST_FAILURE:
                draft.user_list_Loading = false;
                draft.user_list_error = action.error;
                break;
            case USER_CHECK_ID_REQUEST:
                draft.user_check_id_Loading = true;
                draft.user_check_id_error = null;
                draft.user_check_id_done = false;
                break;
            case USER_CHECK_ID_SUCCESS:
                draft.user_check_id_Loading = false;
                draft.userCheckId = action.data;
                draft.user_check_id_done = true;
                break;
            case USER_CHECK_ID_FAILURE:
                draft.user_check_id_Loading = false;
                draft.user_check_id_error = action.error;
                break;
            case USER_REGISTER_REQUEST:
                draft.user_register_Loading = true;
                draft.user_register_error = null;
                draft.user_register_done = false;
                break;
            case USER_REGISTER_SUCCESS:
                draft.user_register_Loading = false;
                draft.userCheckId = action.data;
                draft.user_register_done = true;
                break;
            case USER_REGISTER_FAILURE:
                draft.user_register_Loading = false;
                draft.user_register_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;