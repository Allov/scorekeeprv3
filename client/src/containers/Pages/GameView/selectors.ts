import { createSelector } from 'reselect';
import { IRound, IStore } from '../../../types';
import { IGameViewPage } from './reducer';

const getGameViewState = (state: IStore) => state.pages!.gameView;

export const makeSelectGameViewPage = () => createSelector<IStore, IGameViewPage | undefined, IGameViewPage>(
  getGameViewState,
  (state: IGameViewPage) => {
    return state;
  },
);

export const makeSelectGameViewId = () => createSelector<IStore, IGameViewPage | undefined, string>(
  getGameViewState,
  (state: IGameViewPage) => {
    return state.game.id;
  }
);

export const makeSelectGameViewTitle = () => createSelector<IStore, IGameViewPage | undefined, string>(
  getGameViewState,
  (state: IGameViewPage) => {
    return state.title;
  }
);

export const makeSelectGameViewCurrentRound = () => createSelector<IStore, IGameViewPage | undefined, IRound | undefined>(
  getGameViewState,
  (state: IGameViewPage) => {
    return state.game.rounds
      ? state.game.rounds!.find(round => round.roundNumber === state.game.currentRound)
      : undefined;
  }
);
