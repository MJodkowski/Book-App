import * as actionTypes from "../actions/actions";

export default (
  state = { loggedIn: false, registerError: null, user: null },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload
      };
    case actionTypes.REGISTER:
      return {
        ...state,
        loggedIn: true,
        registerError: null,
        user: action.payload
      };
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        registerError: action.payload
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        loggedIn: action.payload.success,
        user: action.payload.user
      };
    default:
      return state;
  }
};
