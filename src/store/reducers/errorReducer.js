import * as actionTypes from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_FAILED:
      return {
        ...state,
        registerError: action.payload,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
      };
    case actionTypes.SEARCH_FAILED:
      return {
        ...state,
        searchError: action.payload,
      };
    case actionTypes.REVIEW_FAILED:
      return {
        ...state,
        reviewError: action.payload,
      };
    default:
      return state;
  }
};
