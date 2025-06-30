import produce from "../util/produce";

export const initialState = {
    company_number_Loading: false,
    company_number_done: false,
    company_number_error: null,
    companyNumber: null,

};

export const COMPANY_NUMBER_REQUEST = "COMPANY_NUMBER_REQUEST";
export const COMPANY_NUMBER_SUCCESS = "COMPANY_NUMBER_SUCCESS";
export const COMPANY_NUMBER_FAILURE = "COMPANY_NUMBER_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case COMPANY_NUMBER_REQUEST:
                draft.company_number_Loading = true;
                draft.company_number_error = null;
                draft.company_number_done = false;
                break;
            case COMPANY_NUMBER_SUCCESS:
                draft.company_number_Loading = false;
                draft.companyNumber = action.data;
                draft.company_number_done = true;
                break;
            case COMPANY_NUMBER_FAILURE:
                draft.company_number_Loading = false;
                draft.company_number_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;