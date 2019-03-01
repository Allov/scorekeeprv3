import { IStore } from '../../../../types';
import { IGameAdminPage } from '../reducer';
import { makeSelectGameAdminId, makeSelectGameAdminPage } from '../selectors';

const id = 'dont-care';
const gameAdmin: IGameAdminPage = {
  data: {},
  game: {
    createdBy: '',
    currentRound: 1,
    id,
    name: '',
    players: [],
    shareId: '',
  },
  title: '',
};
const state: IStore = {
  pages: {
    gameAdmin,
  },
};

it('selects the gameAdmin page state', () => {
  const gameAdminSelector = makeSelectGameAdminPage();
  expect(gameAdminSelector(state)).toEqual(gameAdmin);
});

it('selects the gameAdmin page state', () => {
  const gameIdSelector = makeSelectGameAdminId();
  expect(gameIdSelector(state)).toEqual(id);
});
