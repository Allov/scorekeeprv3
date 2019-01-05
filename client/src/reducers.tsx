import { combineReducers } from 'redux';
import { appReducer } from './containers/App/reducer';

const createReducer = () => combineReducers({
  configuration: appReducer,
});

export default createReducer;

