import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import { combineReducers } from 'redux';
import { configurationReducer } from './containers/Configurations/reducer';
import { notificationsReducer } from './containers/Notifications/reducer';

const createReducer = (history: History) => combineReducers({
  configuration: configurationReducer,
  notifications: notificationsReducer,
  router: connectRouter(history),
});

export default createReducer;

