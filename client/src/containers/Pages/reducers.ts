import { combineReducers } from 'redux';
import { gameAdminReducer } from './GameAdmin/reducer';

export const pageReducers = combineReducers({
  gameAdmin: gameAdminReducer,
});
