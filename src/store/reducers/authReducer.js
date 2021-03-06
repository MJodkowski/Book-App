import * as actionTypes from "../actions/types";

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
    case actionTypes.REGISTER:
      return {
        ...state,
        loggedIn: true,
        registerError: null,
        user: action.payload
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
