import { IPlayer, IRound, IStore } from '../../../../types';
import { IGamePage } from '../reducer';
import {
  makeSelectGameCurrentRound,
  makeSelectGameId,
  makeSelectGamePage,
  makeSelectGameTitle,
  makeSelectPlayerId
} from '../selectors';

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

const game: IGamePage = {
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
    game,
  },
};

it('selects the Game page state', () => {
  const GameSelector = makeSelectGamePage();
  expect(GameSelector(state)).toEqual(game);
});

it('selects the Game id', () => {
  const gameIdSelector = makeSelectGameId();
  expect(gameIdSelector(state)).toEqual(id);
});

it('selects the Game title', () => {
  const gameTitleSelector = makeSelectGameTitle();
  expect(gameTitleSelector(state)).toEqual(game.title);
});

it('selects the Game current round', () => {
  const gameCurrentRoundSelector = makeSelectGameCurrentRound();
  expect(gameCurrentRoundSelector(state)).toEqual(round);
});

it('selects the Game player by index', () => {
  const gamePlayerSelector = makeSelectPlayerId(1);
  expect(gamePlayerSelector(state)).toEqual(player2.id);
});
