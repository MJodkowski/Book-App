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

export const logIn = (name, password) => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/login', { name, password });
            dispatch({ type: LOGIN, payload: user });
        } catch (err) {
            dispatch({ type: LOGIN_FAILED, payload: err.message })
            dispatch({ type: DISPLAY_FLASH, payload: 'error' })
            setTimeout(() => {
                dispatch({type: HIDE_FLASH})
            }, 5000);
        }
    }
}

export const register = (name, password, email) => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/register', { name, password, email });
            dispatch({ type: REGISTER, payload: user });
            dispatch({ type: DISPLAY_FLASH, payload: 'success' })
            setTimeout(() => {
                dispatch({type: HIDE_FLASH})
            }, 5000);
        } catch (err) {
            dispatch({ type: REGISTER_FAILED, payload: err.message })
            dispatch({ type: DISPLAY_FLASH, payload: 'error' })
            setTimeout(() => {
                dispatch({type: HIDE_FLASH})
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
            if (user) dispatch({ type: AUTHENTICATE, payload: true });
        } catch (err) {
            dispatch({ type: LOGIN, payload: false })
        }
    }
}

export const search = (field, query) => {
    return async (dispatch) => {
        try {
            const results = await HTTP.get(`http://localhost:3001/book/search?field=${field}&query=${query}`);
            dispatch({ type: STORE_RESULTS, payload: results });
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