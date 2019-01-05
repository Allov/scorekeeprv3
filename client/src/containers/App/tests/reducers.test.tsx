import { IConfiguration } from '../../../types';
import * as actions from '../actions';
import { appReducer } from '../reducer';

it('returns the initial state', () => {
  const expectedState: IConfiguration = {
    theme: 'DEFAULT'
  };

  expect(appReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with the correct configured theme', () => {
  const theme: string = 'dont-care';
  const expectedState: IConfiguration = {
    theme,
  };

  const state: IConfiguration = {
    theme: 'DEFAULT'
  };

  expect(appReducer(state, actions.createGame(theme))).toEqual(expectedState);
});
