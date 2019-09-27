import { combineReducers } from 'redux';
import { createGameReducer } from './Create/reducer';
import { gameReducer } from './Game/reducer';

export const pageReducers = combineReducers({
  createGame: createGameReducer,
  game: gameReducer,
});
