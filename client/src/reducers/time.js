import produce from "../util/produce";

export const initialState = {
    time_register_Loading: false,
    time_register_done: false,
    time_register_error: null,

    time_list_outer_Loading: false,
    time_list_outer_done: false,
    time_list_outer_error: null,

    time_list_inner_Loading: false,
    time_list_inner_done: false,
    time_list_inner_error: null,

    timeListOuter: null,
    timeListInner: null,
};

export const TIME_REGISTER_REQUEST = "TIME_REGISTER_REQUEST";
export const TIME_REGISTER_SUCCESS = "TIME_REGISTER_SUCCESS";
export const TIME_REGISTER_FAILURE = "TIME_REGISTER_FAILURE";

export const TIME_LIST_OUTER_REQUEST = "TIME_LIST_OUTER_REQUEST";
export const TIME_LIST_OUTER_SUCCESS = "TIME_LIST_OUTER_SUCCESS";
export const TIME_LIST_OUTER_FAILURE = "TIME_LIST_OUTER_FAILURE";

export const TIME_LIST_INNER_REQUEST = "TIME_LIST_INNER_REQUEST";
export const TIME_LIST_INNER_SUCCESS = "TIME_LIST_INNER_SUCCESS";
export const TIME_LIST_INNER_FAILURE = "TIME_LIST_INNER_FAILURE";

export const TIME_EDIT_REQUEST = "TIME_EDIT_REQUEST";
export const TIME_EDIT_SUCCESS = "TIME_EDIT_SUCCESS";
export const TIME_EDIT_FAILURE = "TIME_EDIT_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case TIME_REGISTER_REQUEST:
                draft.time_register_Loading = true;
                draft.time_register_error = null;
                draft.time_register_done = false;
                break;
            case TIME_REGISTER_SUCCESS:
                draft.time_register_Loading = false;
                draft.time_register_done = true;
                break;
            case TIME_REGISTER_FAILURE:
                draft.time_register_Loading = false;
                draft.time_register_error = action.error;
                break;
            case TIME_LIST_OUTER_REQUEST:
                draft.time_list_outer_Loading = true;
                draft.time_list_outer_error = null;
                draft.time_list_outer_done = false;
                break;
            case TIME_LIST_OUTER_SUCCESS:
                draft.time_list_outer_Loading = false;
                draft.timeListOuter = action.data;
                draft.time_list_outer_done = true;
                break;
            case TIME_LIST_OUTER_FAILURE:
                draft.time_list_outer_Loading = false;
                draft.time_list_outer_error = action.error;
                break;
            case TIME_LIST_INNER_REQUEST:
                draft.time_list_inner_Loading = true;
                draft.time_list_inner_error = null;
                draft.time_list_inner_done = false;
                break;
            case TIME_LIST_INNER_SUCCESS:
                draft.time_list_inner_Loading = false;
                draft.timeListInner = action.data;
                draft.time_list_inner_done = true;
                break;
            case TIME_LIST_INNER_FAILURE:
                draft.time_list_inner_Loading = false;
                draft.time_list_inner_error = action.error;
                break;
            case TIME_EDIT_REQUEST:
                draft.time_edit_Loading = true;
                draft.time_edit_error = null;
                draft.time_edit_done = false;
                break;
            case TIME_EDIT_SUCCESS:
                draft.time_edit_Loading = false;
                draft.time_edit_done = true;
                break;
            case TIME_EDIT_FAILURE:
                draft.time_edit_Loading = false;
                draft.time_edit_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;