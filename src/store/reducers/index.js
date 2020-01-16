import { combineReducers } from 'redux';
import flashReducer from './flashReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';
import spinnerReducer from './spinnerReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  flash: flashReducer,
  auth: authReducer,
  search: searchReducer,
  spinner: spinnerReducer,
  errors: errorReducer,
});
