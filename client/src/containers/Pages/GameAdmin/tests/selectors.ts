import { IStore } from '../../../../types';
import { initialState } from '../reducer';
import { makeSelectGameAdminPage } from '../selectors';

it('returns game admin page', () => {
  const state: IStore = {
    pages: {
      gameAdmin: initialState
    },
  };

  const gameAdminSelector = makeSelectGameAdminPage();

  expect(gameAdminSelector(state)).toEqual(initialState);
});
