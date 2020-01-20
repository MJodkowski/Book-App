import * as actionTypes from "../actions/types";

export default (state = { currentPage: 1, perPage: 10, numberOfPages: 0 }, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case actionTypes.SET_NUMBER_OF_PAGES:
      return {
        ...state,
        numberOfPages: action.payload,
      }
    default:
      return state;
  }
};
