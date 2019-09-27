import { createSelector } from 'reselect';
import { IGameInput, IStore } from '../../../types';
import { ICreateGamePage } from './reducer';

const getCreateGameState = (state: IStore) => state.pages!.createGame;

export const makeSelectGameName = () => createSelector<IStore, ICreateGamePage | undefined, string>(
  getCreateGameState,
  (state: ICreateGamePage) => {
    return state.input.name;
  },
);

export const makeSelectGameNumberOfPlayers = () => createSelector<IStore, ICreateGamePage | undefined, number>(
  getCreateGameState,
  (state: ICreateGamePage) => {
    return state.input.numberOfPlayers;
  }
)

export const makeSelectCreateGameInput = () => createSelector<IStore, ICreateGamePage | undefined, IGameInput>(
  getCreateGameState,
  (state: ICreateGamePage) => {
    return state.input;
  }
)
