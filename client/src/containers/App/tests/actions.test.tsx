import * as actions from '../actions';
import * as constants from '../constants';

it('should return dispatch the correct configureTheme action type', () => {
  const theme = 'dont-care';
  const expectedResult: actions.IConfigureTheme = {
    theme,
    type: constants.CONFIGURE_THEME,
  };

  expect(actions.createGame(theme)).toEqual(expectedResult);
});
