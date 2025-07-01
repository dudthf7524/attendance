import produce from "../util/produce";

export const initialState = {
    join_Loading: false,
    join_done: false,
    join_error: null,
    join: null,

};

export const JOIN_REQUEST = "JOIN_REQUEST";
export const JOIN_SUCCESS = "JOIN_SUCCESS";
export const JOIN_FAILURE = "JOIN_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case JOIN_REQUEST:
                draft.join_Loading = true;
                draft.join_error = null;
                draft.join_done = false;
                break;
            case JOIN_SUCCESS:
                draft.join_Loading = false;
                draft.join = action.data;
                draft.join_done = true;
                break;
            case JOIN_FAILURE:
                draft.join_Loading = false;
                draft.join_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;