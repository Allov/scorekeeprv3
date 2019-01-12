import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import { combineReducers } from 'redux';
import { configurationReducer } from './containers/Configurations/reducer';
import { notificationsReducer } from './containers/Notifications/reducer';
import { pageReducers } from './containers/Pages/reducers';

const createReducer = (history: History) => combineReducers({
  configuration: configurationReducer,
  notifications: notificationsReducer,
  pages: pageReducers,
  router: connectRouter(history),
});

export default createReducer;

