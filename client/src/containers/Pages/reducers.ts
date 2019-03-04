import { combineReducers } from 'redux';
import { gameAdminReducer } from './GameAdmin/reducer';
import { gameViewReducer } from './GameView/reducer';

export const pageReducers = combineReducers({
  gameAdmin: gameAdminReducer,
  gameView: gameViewReducer,
});
