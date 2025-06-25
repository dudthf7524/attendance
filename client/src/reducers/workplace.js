import produce from "../util/produce";

export const initialState = {
    work_place_register_Loading: false,
    work_place_register_done: false,
    work_place_register_error: null,
};

export const WORK_PLACE_REGISTER_REQUEST = "WORK_PLACE_REGISTER_REQUEST";
export const WORK_PLACE_REGISTER_SUCCESS = "WORK_PLACE_REGISTER_SUCCESS";
export const WORK_PLACE_REGISTER_FAILURE = "WORK_PLACE_REGISTER_FAILURE";

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
            default:
                return state;
        }
    });
};

export default reducer;