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

    user_edit_Loading: false,
    user_edit_done: false,
    user_edit_error: null,

    user_delete_Loading: false,
    user_delete_done: false,
    user_delete_error: null,

    user_detail_Loading: false,
    user_detail_done: false,
    user_detail_error: null,

    userList: null,
    userCheckId: null,
    userDetail: null,
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

export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";
export const USER_EDIT_FAILURE = "USER_EDIT_FAILURE";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";

export const USER_DETAIL_REQUEST = "USER_DETAIL_REQUEST";
export const USER_DETAIL_SUCCESS = "USER_DETAIL_SUCCESS";
export const USER_DETAIL_FAILURE = "USER_DETAIL_FAILURE";

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
            case USER_EDIT_REQUEST:
                draft.user_edit_Loading = true;
                draft.user_edit_error = null;
                draft.user_edit_done = false;
                break;
            case USER_EDIT_SUCCESS:
                draft.user_edit_Loading = false;
                draft.user_edit_done = true;
                break;
            case USER_EDIT_FAILURE:
                draft.user_edit_Loading = false;
                draft.user_edit_error = action.error;
                break;
            case USER_DELETE_REQUEST:
                draft.user_delete_Loading = true;
                draft.user_delete_error = null;
                draft.user_delete_done = false;
                break;
            case USER_DELETE_SUCCESS:
                draft.user_delete_Loading = false;
                draft.user_delete_done = true;
                break;
            case USER_DELETE_FAILURE:
                draft.user_delete_Loading = false;
                draft.user_delete_error = action.error;
                break;
            case USER_DETAIL_REQUEST:
                draft.user_detail_Loading = true;
                draft.user_detail_error = null;
                draft.user_detail_done = false;
                break;
            case USER_DETAIL_SUCCESS:
                draft.user_detail_Loading = false;
                draft.userDetail = action.data;
                draft.user_detail_done = true;
                break;
            case USER_DETAIL_FAILURE:
                draft.user_detail_Loading = false;
                draft.user_detail_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;