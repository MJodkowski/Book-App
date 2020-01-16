import * as actionTypes from "../actions/types";

export default (state = { flash: false, flashType: null }, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_FLASH:
      return {
        ...state,
        flash: true,
        flashType: action.payload.type,
        flashMessage: action.payload.message,
      };
    case actionTypes.HIDE_FLASH:
      return {
        ...state,
        flash: false
      };
    default:
      return state;
  }
};
