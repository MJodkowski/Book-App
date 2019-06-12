import * as actionTypes from '../actions/actions';

export default (state = { isFetching: false }, action) => {
    switch (action.type) {
        case actionTypes.DATA_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.DATA_FETCHED:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}