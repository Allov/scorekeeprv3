import * as actions from '../actions';
import * as constants from '../constants';

it('dispatches the correct createGame action type', () => {
  const name = 'dont-care';
  const userId = undefined;
  const expectedResult: actions.ICreateGameAction = {
    name,
    type: constants.CREATE_GAME,
    userId,
  };

  expect(actions.createGame(name, userId)).toEqual(expectedResult);
});
