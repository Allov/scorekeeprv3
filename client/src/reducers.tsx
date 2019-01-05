import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import { combineReducers } from 'redux';
import { appReducer } from './containers/App/reducer';

const createReducer = (history: History) => combineReducers({
  configuration: appReducer,
  router: connectRouter(history),
});

export default createReducer;

