import { IGame } from '../../../../types';
import * as actions from '../actions';
import { gameReducer, IGamePageRecord, initialState } from '../reducer';

it('returns the initial state', () => {
  const expectedState = initialState;
  expect(gameReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with the correct game information', () => {
  const game: IGame = initialState.game;
  const expectedState: IGamePageRecord = initialState;

  expect(gameReducer(initialState, actions.fetchedGame(game))).toEqual(expectedState);
});
