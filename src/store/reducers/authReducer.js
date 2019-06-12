import * as actionTypes from '../actions/actions';

export default (state = { loggedIn: false, registerError: null }, action) => {
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
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                loginError: action.payload
            }
        case actionTypes.REGISTER:
            return {
                ...state,
                loggedIn: true,
                registerError: null
            }
        case actionTypes.REGISTER_FAILED:
            return {
                ...state,
                registerError: action.payload
            }
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            return state;
    }
}