import { combineReducers } from 'redux';
import { game } from './containers/App/reducer';

const createReducer = () => combineReducers({
  game,
});

export default createReducer;
