import { IGame } from '../../../../types';
import * as actions from '../actions';
import { gameAdminReducer, IGameAdminPage, initialState } from '../reducer';

it('returns the initial state', () => {
  const expectedState = initialState;
  expect(gameAdminReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with the correct game information', () => {
  const game: IGame = {
    createdBy: 'dont-care',
    id: 'dont-care',
    name: 'dont-care',
    shareId: 'dont-care',
  };

  const expectedState: IGameAdminPage = {
    data: {},
    game,
    title: 'Game Admin',
  };

  expect(gameAdminReducer(initialState, actions.fetchedGame(game))).toEqual(expectedState);
});
