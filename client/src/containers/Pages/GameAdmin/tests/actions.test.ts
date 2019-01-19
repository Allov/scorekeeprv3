import { IGame } from '../../../../types';
import * as actions from '../actions';
import * as constants from '../constants';

const game: IGame = {
  createdBy: 'dont-care',
  id: 'dont-care',
  name: 'dont-care',
  shareId: 'dont-care',
};

it('dispatches the correct fetchGame action type', () => {
  const shareId = 'dont-care';
  const expectedResult: actions.IFetchGameAction = {
    shareId,
    type: constants.FETCH_GAME,
  };

  expect(actions.fetchGame(shareId)).toEqual(expectedResult);
});

it('dispatches the correct fetchedGame action type', () => {
  const expectedResult: actions.IFetchedGameAction = {
    game,
    type: constants.FETCHED_GAME,
  };

  expect(actions.fetchedGame(game)).toEqual(expectedResult);
});

it('dispatches the correct addPlayerToGame action type', () => {
  const gameId = 'dont-care';
  const name = 'dont-care';

  const expectedResult: actions.IAddPlayerToGameAction = {
    gameId,
    name,
    type: constants.ADDPLAYERTO_GAME,
  };

  expect(actions.addPlayerToGame(gameId, name)).toEqual(expectedResult);
});

it('dispatches the correct addedPlayerToGame action type', () => {
  const expectedResult: actions.IAddedPlayerToGameAction = {
    game,
    type: constants.ADDEDPLAYERTO_GAME,
  };

  expect(actions.addedPlayerToGame(game)).toEqual(expectedResult);
});
