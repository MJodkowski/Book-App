import { DISPLAY_FLASH, HIDE_FLASH } from '../store/actions/types';

export default (dispatch, type, message) => {
  dispatch({ type: DISPLAY_FLASH, payload: { type, message } });
  return setTimeout(() => {
    dispatch({ type: HIDE_FLASH });
  }, 5000);
};
