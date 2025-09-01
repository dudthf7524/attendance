import produce from "../util/produce";

export const initialState = {
    work_place_register_Loading: false,
    work_place_register_done: false,
    work_place_register_error: null,

    work_place_get_Loading: false,
    work_place_get_done: false,
    work_place_get_error: null,

    work_place_edit_Loading: false,
    work_place_edit_done: false,
    work_place_edit_error: null,

    workPlaceData: null,

};

export const WORK_PLACE_REGISTER_REQUEST = "WORK_PLACE_REGISTER_REQUEST";
export const WORK_PLACE_REGISTER_SUCCESS = "WORK_PLACE_REGISTER_SUCCESS";
export const WORK_PLACE_REGISTER_FAILURE = "WORK_PLACE_REGISTER_FAILURE";

export const WORK_PLACE_GET_REQUEST = "WORK_PLACE_GET_REQUEST";
export const WORK_PLACE_GET_SUCCESS = "WORK_PLACE_GET_SUCCESS";
export const WORK_PLACE_GET_FAILURE = "WORK_PLACE_GET_FAILURE";

export const WORK_PLACE_EDIT_REQUEST = "WORK_PLACE_EDIT_REQUEST";
export const WORK_PLACE_EDIT_SUCCESS = "WORK_PLACE_EDIT_SUCCESS";
export const WORK_PLACE_EDIT_FAILURE = "WORK_PLACE_EDIT_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case WORK_PLACE_REGISTER_REQUEST:
                draft.work_place_register_Loading = true;
                draft.work_place_regitser_error = null;
                draft.work_place_register_done = false;
                break;
            case WORK_PLACE_REGISTER_SUCCESS:
                draft.work_place_register_Loading = false;
                draft.work_place_register_done = true;
                break;
            case WORK_PLACE_REGISTER_FAILURE:
                draft.work_place_register_Loading = false;
                draft.work_place_register_error = action.error;
                break;
            case WORK_PLACE_GET_REQUEST:
                draft.work_place_get_Loading = true;
                draft.work_place_get_error = null;
                draft.work_place_get_done = false;
                break;
            case WORK_PLACE_GET_SUCCESS:
                draft.work_place_get_Loading = false;
                draft.workPlaceData = action.data;
                draft.work_place_get_done = true;
                break;
            case WORK_PLACE_GET_FAILURE:
                draft.work_place_get_Loading = false;
                draft.work_place_get_error = action.error;
                break;
            case WORK_PLACE_EDIT_REQUEST:
                draft.work_place_edit_Loading = true;
                draft.work_place_edit_error = null;
                draft.work_place_edit_done = false;
                break;
            case WORK_PLACE_EDIT_SUCCESS:
                draft.work_place_edit_Loading = false;
                draft.work_place_edit_done = true;
                break;
            case WORK_PLACE_EDIT_FAILURE:
                draft.work_place_edit_Loading = false;
                draft.work_place_edit_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;