import { IConfiguration } from '../../../types';
import * as actions from '../actions';
import { configurationReducer } from '../reducer';

it('returns the initial state', () => {
  const expectedState: IConfiguration = {
    theme: 'day'
  };

  expect(configurationReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with the correct configured theme', () => {
  const theme: string = 'dont-care';
  const expectedState: IConfiguration = {
    theme,
  };

  const state: IConfiguration = {
    theme: 'day'
  };

  expect(configurationReducer(state, actions.createGame(theme))).toEqual(expectedState);
});
