import { createSelector } from 'reselect';
import { IRound, IStore } from '../../../types';
import { IGameAdminPage } from './reducer';

const getGameAdminState = (state: IStore) => state.pages!.gameAdmin;

export const makeSelectGameAdminPage = () => createSelector<IStore, IGameAdminPage | undefined, IGameAdminPage>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    return state;
  },
);

export const makeSelectGameAdminId = () => createSelector<IStore, IGameAdminPage | undefined, string>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    return state.game.id;
  }
);

export const makeSelectGameAdminTitle = () => createSelector<IStore, IGameAdminPage | undefined, string>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    return state.title;
  }
);

export const makeSelectGameAdminCurrentRound = () => createSelector<IStore, IGameAdminPage | undefined, IRound | undefined>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    return state.game.rounds
      ? state.game.rounds!.find(round => round.roundNumber === state.game.currentRound)
      : undefined;
  }
);

export const makeSelectPlayerId = (index: number) => createSelector<IStore, IGameAdminPage | undefined, string>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    const player = state.game.players![index];
    return player.id;
  }
)
