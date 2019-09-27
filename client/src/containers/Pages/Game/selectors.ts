import { createSelector } from 'reselect';
import { IRound, IStore } from '../../../types';
import { IGamePage } from './reducer';

const getGameState = (state: IStore) => state.pages!.game;

export const makeSelectGamePage = () => createSelector<IStore, IGamePage | undefined, IGamePage>(
  getGameState,
  (state: IGamePage) => {
    return state;
  },
);

export const makeSelectGameId = () => createSelector<IStore, IGamePage | undefined, string>(
  getGameState,
  (state: IGamePage) => {
    return state.game.id;
  }
);

export const makeSelectGameTitle = () => createSelector<IStore, IGamePage | undefined, string>(
  getGameState,
  (state: IGamePage) => {
    return state.game.name;
  }
);

export const makeSelectGameCurrentRound = () => createSelector<IStore, IGamePage | undefined, IRound | undefined>(
  getGameState,
  (state: IGamePage) => {
    return state.game.rounds
      ? state.game.rounds!.find(round => round.roundNumber === state.game.currentRound)
      : undefined;
  }
);

export const makeSelectPlayerId = (index: number) => createSelector<IStore, IGamePage | undefined, string>(
  getGameState,
  (state: IGamePage) => {
    const player = state.game.players![index];
    return player.id;
  }
);
