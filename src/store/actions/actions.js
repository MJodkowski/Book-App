import HTTP from '../../utils/HTTP';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const STORE_RESULTS = 'STORE_RESULTS';
export const ERASE_RESULTS = 'ERASE_RESULTS';

export const logIn = (name, password) => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/login', { name, password });
            dispatch({type: LOGIN, payload: user});
        } catch (err) {
            dispatch({type: LOGIN, payload: false})
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        try {
            await HTTP.post('http://localhost:3001/user/logout');
            dispatch({type: LOGOUT, payload: true});
        } catch (err) {
            dispatch({type: LOGOUT, payload: false})
        }
    }
}

export const authenticate = () => {
    return async (dispatch) => {
        try {
            const user = await HTTP.post('http://localhost:3001/user/authenticate');
            if (user) dispatch({type: AUTHENTICATE, payload: true});
        } catch (err) {
            dispatch({type: LOGIN, payload: false})
        }
    }
}

export const search = (field, query) => {
    return async (dispatch) => {
        try {
            const results = await HTTP.get(`http://localhost:3001/book/search?field=${field}&query=${query}`);
            dispatch({type: STORE_RESULTS, payload: results });
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