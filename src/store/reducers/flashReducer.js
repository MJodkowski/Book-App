import * as actionTypes from "../actions/actions";

export default (state = { flash: null, flashType: null }, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_FLASH:
      return {
        ...state,
        flash: true,
        flashType: action.payload
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
