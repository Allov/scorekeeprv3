import { IStore } from '../../../types';
import { makeSelectTheme } from '../selectors';

it('returns the configured theme', () => {
  const theme: string = 'dont-care';
  const state: IStore = {
    configuration: {
      theme,
    },
    modal: {},
    pages: [],
  };

  const themeSelector = makeSelectTheme();

  expect(themeSelector(state)).toEqual(theme);
});
