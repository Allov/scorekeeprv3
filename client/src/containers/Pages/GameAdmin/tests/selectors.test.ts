import { IStore } from '../../../../types';
import { makeSelectGameAdminPage } from '../selectors';

it('selects the gameAdmin page state', () => {
  const gameAdmin = {
    data: {},
    game: {
      createdBy: '',
      id: '',
      name: '',
      shareId: '',
    },
    title: '',
  };
  const state: IStore = {
    pages: {
      gameAdmin,
    },
  };

  const gameAdminSelector = makeSelectGameAdminPage();
  expect(gameAdminSelector(state)).toEqual(gameAdmin);
});
