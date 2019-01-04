import { createSelector } from 'reselect';
import { IGame, IStore } from './types';

const getGameState = (state: IStore) => state.game;

export const makeSelectGameName = () => createSelector<IStore, IGame | undefined, string>(
  getGameState,
  (state: IGame) => {
    return state.name;
  },
);
