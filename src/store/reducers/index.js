import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';

export default combineReducers({
    flash: flashReducer,
    auth: authReducer,
    search: searchReducer
})

