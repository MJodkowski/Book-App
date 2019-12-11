import HTTP from '../../utils/HTTP';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const AUTHENTICATE = 'AUTHENTICATE';
export const REGISTER = 'REGISTER';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const STORE_RESULTS = 'STORE_RESULTS';
export const ERASE_RESULTS = 'ERASE_RESULTS';
export const DISPLAY_FLASH = 'DISPLAY_FLASH';
export const HIDE_FLASH = 'HIDE_FLASH';
export const DATA_FETCHING = 'DATA_FETCHING';
export const DATA_FETCHED = 'DATA_FETCHED';
export const UPDATE_REVIEWS = 'UPDATE_REVIEWS';

export const logIn = (name, password) => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/login', { name, password });
            dispatch({ type: HIDE_FLASH });
            dispatch({ type: LOGIN, payload: user.user.name });
        } catch (err) {
            dispatch({ type: LOGIN_FAILED, payload: err.message })
            dispatch({ type: DISPLAY_FLASH, payload: 'error' })
            setTimeout(() => {
                dispatch({ type: HIDE_FLASH })
            }, 5000);
        }
    }
}

export const register = (name, password, email) => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/register', { name, password, email });
            dispatch({ type: REGISTER, payload: user.user.name });
            dispatch({ type: DISPLAY_FLASH, payload: 'success' })
            setTimeout(() => {
                dispatch({ type: HIDE_FLASH })
            }, 5000);
        } catch (err) {
            dispatch({ type: REGISTER_FAILED, payload: err.message })
            dispatch({ type: DISPLAY_FLASH, payload: 'error' })
            setTimeout(() => {
                dispatch({ type: HIDE_FLASH })
            }, 5000);
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        try {
            await HTTP.post('http://localhost:3001/user/logout');
            dispatch({ type: LOGOUT, payload: true });
        } catch (err) {
            dispatch({ type: LOGOUT, payload: false })
        }
    }
}

export const authenticate = () => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/authenticate');
            if (user) dispatch({
                type: AUTHENTICATE,
                payload: {
                    user: user.user.name,
                    success: true
                }
            });
        } catch (err) {
            dispatch({
                type: AUTHENTICATE,
                payload: {
                    user: null,
                    success: false
                }
            })
        }
    }
}

export const search = (field, query) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DATA_FETCHING })
            const results = await HTTP.get(`http://localhost:3001/book/search?field=${field}&query=${query}`);
            !results.length ? dispatch({ type: STORE_RESULTS, payload: null }) 
            : dispatch({ type: STORE_RESULTS, payload: results });
            dispatch({ type: DATA_FETCHED });
        } catch (err) {
            dispatch({ type: DATA_FETCHED });
            console.log(err);
        }
    }
}

export const postReview = (author, title, rating, contents) => {
    return async (dispatch) => {
        try {
            await HTTP.post(`http://localhost:3001/book/${title}/review`, { author, title, rating, contents });
            const reviews = await HTTP.get(`http://localhost:3001/book/reviews?title=${title}`);
            dispatch({ type: UPDATE_REVIEWS, payload: { reviews, title } });
        } catch (err) {
            console.log(err);
        }
    }
}

export const patchReview = (author, title, rating, contents, reviewId) => {
    return async (dispatch) => {
        try {
            await HTTP.patch(`http://localhost:3001/book/${title}/reviews/${reviewId}`, { author, title, rating, contents, reviewId });
            const reviews = await HTTP.get(`http://localhost:3001/book/reviews?title=${title}`);
            dispatch({ type: UPDATE_REVIEWS, payload: { reviews, title } });
        } catch (err) {
            console.log(err);
        }
    }
}

export const eraseSearch = (payload) => {
    return {
        type: ERASE_RESULTS,
        payload: payload
    }
}

export const displayFlash = () => {
    return {
        type: DISPLAY_FLASH,
        payload: true
    }
}

export const hideFlash = () => {
    return {
        type: DISPLAY_FLASH,
        payload: false
    }
}