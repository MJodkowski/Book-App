import * as actionTypes from './types';
import showFlash from '../../utils/showFlash';
import loginUser from '../../api/loginUser';
import registerUser from '../../api/registerUser';
import logOutCurrentUserSession from '../../api/logOutCurrentUserSession';
import authenticateUser from '../../api/authenticateUser';
import fetchBookList from '../../api/fetchBookList';
import postBookReview from '../../api/postBookReview';
import patchBookReview from '../../api/patchBookReview';
import { flashMessages } from '../../utils/constants';

export const logIn = (username, password) => {
  return async dispatch => {
    const loginResponse = await loginUser(username, password);
    if (!loginResponse.success) {
      dispatch({ type: actionTypes.LOGIN_FAILED, payload: loginResponse.error });
      return showFlash(dispatch, 'error', loginResponse.error);
    }
    dispatch({ type: actionTypes.HIDE_FLASH });
    dispatch({ type: actionTypes.LOGIN, payload: loginResponse.username });
  };
};

export const register = (name, password, email) => {
  return async dispatch => {
    const registerResponse = await registerUser(name, password, email);
    if (!registerResponse.success) {
      dispatch({ type: actionTypes.REGISTER_FAILED, payload: registerResponse.error });
      return showFlash(dispatch, 'error', registerResponse.error);
    }
    dispatch({ type: actionTypes.REGISTER, payload: registerResponse.username });
    showFlash(dispatch, 'success', flashMessages.onSuccessfulRegister);
  };
};

export const logOut = () => {
  return async dispatch => {
    const logOutCurrentUserSessionResponse = await logOutCurrentUserSession();
    if (!logOutCurrentUserSessionResponse.success) {
      dispatch({ type: actionTypes.LOGOUT, payload: false });
    }
    dispatch({ type: actionTypes.LOGOUT, payload: true });
  };
};

export const authenticate = () => {
  return async dispatch => {
    const { user, success } = await authenticateUser();
    if (!success) {
      return dispatch({
        type: actionTypes.AUTHENTICATE,
        payload: {
          user: null,
          success,
        },
      });
    }
    dispatch({
      type: actionTypes.AUTHENTICATE,
      payload: {
        user: user.name,
        success,
      },
    });
  };
};

export const search = (field, query) => {
  return async dispatch => {
    dispatch({ type: actionTypes.DATA_FETCHING });
    const searchResponse = await fetchBookList(field, query);
    if (!searchResponse.success) {
      dispatch({ type: actionTypes.SEARCH_FAILED, payload: searchResponse.error });
      showFlash(dispatch, 'error', searchResponse.error);
      return dispatch({ type: actionTypes.DATA_FETCHED });
    }
    !searchResponse.results.length
      ? dispatch({ type: actionTypes.STORE_RESULTS, payload: null })
      : dispatch({ type: actionTypes.STORE_RESULTS, payload: searchResponse.results });
    dispatch({ type: actionTypes.DATA_FETCHED });
  };
};

export const postReview = (author, title, rating, contents) => {
  return async dispatch => {
    const postBookReviewResponse = await postBookReview(
      author,
      title,
      rating,
      contents
    );
    if (!postBookReviewResponse.success) {
      dispatch({ type: actionTypes.POST_REVIEW_FAILED, payload: postBookReviewResponse.error });
      return showFlash(dispatch, 'error', postBookReviewResponse.error);
    }
    dispatch({
      type: actionTypes.UPDATE_REVIEWS,
      payload: { reviews: postBookReviewResponse.book.reviews, title },
    });
  };
};

export const patchReview = (author, title, rating, contents, reviewId) => {
  return async dispatch => {
    const patchBookReviewResponse = await patchBookReview(
      author,
      title,
      rating,
      contents,
      reviewId
    );
    if (!patchBookReviewResponse.success) {
      dispatch({ type: actionTypes.PATCH_REVIEW_FAILED, payload: patchBookReviewResponse.error });
      showFlash(dispatch, 'error', patchBookReviewResponse.error);
      return { success: false }
    }
    dispatch({
      type: actionTypes.UPDATE_REVIEWS,
      payload: { reviews: patchBookReviewResponse.book.reviews, title },
    });
    return { success: true }
  };
};

export const eraseSearch = payload => {
  return {
    type: actionTypes.ERASE_RESULTS,
    payload: payload,
  };
};

export const displayFlash = () => {
  return {
    type: actionTypes.DISPLAY_FLASH,
    payload: true,
  };
};

export const hideFlash = () => {
  return {
    type: actionTypes.DISPLAY_FLASH,
    payload: false,
  };
};
