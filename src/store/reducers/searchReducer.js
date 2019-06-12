import * as actionTypes from '../actions/actions';

export default (state = { searchResults: [] }, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case actionTypes.ERASE_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        default:
            return state;
    }
}