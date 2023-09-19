import {combineReducers} from 'redux';
import appReducer from './Reducers/appReducer';
const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
