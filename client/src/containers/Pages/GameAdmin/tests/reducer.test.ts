import { IGame } from '../../../../types';
import * as actions from '../actions';
import { gameAdminReducer, IGameAdminPageRecord, initialState } from '../reducer';

it('returns the initial state', () => {
  const expectedState = initialState;
  expect(gameAdminReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with the correct game information', () => {
  const game: IGame = initialState.game;
  const expectedState: IGameAdminPageRecord = initialState;

  expect(gameAdminReducer(initialState, actions.fetchedGame(game))).toEqual(expectedState);
});
