import { IGame } from '../../../../types';
import * as actions from '../actions';
import * as constants from '../constants';

it('dispatches the correct fetchGame action type', () => {
  const shareId = 'dont-care';
  const expectedResult: actions.IFetchGameAction = {
    shareId,
    type: constants.FETCH_GAME,
  };

  expect(actions.fetchGame(shareId)).toEqual(expectedResult);
});

it('dispatches the correct fetchedGame action type', () => {
  const game: IGame = {
    createdBy: 'dont-care',
    id: 'dont-care',
    name: 'dont-care',
    shareId: 'dont-care',
  };

  const expectedResult: actions.IFetchedGameAction = {
    game,
    type: constants.FETCHED_GAME,
  };

  expect(actions.fetchedGame(game)).toEqual(expectedResult);
});
