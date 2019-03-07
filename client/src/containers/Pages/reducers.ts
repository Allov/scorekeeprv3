import { combineReducers } from 'redux';
import { gameReducer } from './Game/reducer';

export const pageReducers = combineReducers({
  game: gameReducer,
});
