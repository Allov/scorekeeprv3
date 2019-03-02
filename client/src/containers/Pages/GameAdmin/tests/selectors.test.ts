import { IPlayer, IRound, IStore } from '../../../../types';
import { IGameAdminPage } from '../reducer';
import { makeSelectGameAdminCurrentRound, makeSelectGameAdminId, makeSelectGameAdminPage, makeSelectGameAdminTitle, makeSelectPlayerId } from '../selectors';

const id = 'dont-care';
const round: IRound = {
  id: '',
  roundNumber: 1,
  scores: [],
};

const player1: IPlayer = {
  id: '1',
  name: 'dont-care1',
  totalScore: 1,
};

const player2: IPlayer = {
  id: '2',
  name: 'dont-care2',
  totalScore: 2,
};

const gameAdmin: IGameAdminPage = {
  data: {},
  game: {
    createdBy: '',
    currentRound: 1,
    id,
    name: '',
    players: [player1, player2],
    rounds: [round],
    shareId: '',
  },
  title: 'dont-care',
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

it('selects the gameAdmin id', () => {
  const gameIdSelector = makeSelectGameAdminId();
  expect(gameIdSelector(state)).toEqual(id);
});

it('selects the gameAdmin title', () => {
  const gameTitleSelector = makeSelectGameAdminTitle();
  expect(gameTitleSelector(state)).toEqual(gameAdmin.title);
});

it('selects the gameAdmin current round', () => {
  const gameCurrentRoundSelector = makeSelectGameAdminCurrentRound();
  expect(gameCurrentRoundSelector(state)).toEqual(round);
});

it('selects the gameAdmin player by index', () => {
  const gamePlayerSelector = makeSelectPlayerId(1);
  expect(gamePlayerSelector(state)).toEqual(player2.id);
});
