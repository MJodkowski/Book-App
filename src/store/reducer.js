import * as actionTypes from './actions/actions';

const initialState = {
    loggedIn: null,
    searchResults: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            if (action.payload) {
                return {
                    ...state,
                    loggedIn: true
                }
            } else {
                return {
                    ...state,
                    loggedIn: false
                };
            }
        case actionTypes.LOGOUT:
            if (action.payload) {
                return {
                    ...state,
                    loggedIn: false
                }
            } else {
                return {
                    ...state,
                    loggedIn: false
                };
            }
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                loggedIn: action.payload
            };
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

export default reducer;