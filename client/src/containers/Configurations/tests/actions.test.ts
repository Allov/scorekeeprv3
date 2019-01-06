import * as actions from '../actions';
import * as constants from '../constants';

it('dispatches the correct configureTheme action type', () => {
  const theme = 'dont-care';
  const expectedResult: actions.IConfigureThemeAction = {
    theme,
    type: constants.CONFIGURE_THEME,
  };

  expect(actions.createGame(theme)).toEqual(expectedResult);
});
