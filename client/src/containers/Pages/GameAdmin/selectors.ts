import { createSelector } from 'reselect';
import { IStore } from '../../../types';
import { IGameAdminPage } from './reducer';

const getGameAdminState = (state: IStore) => state.pages!.gameAdmin;

export const makeSelectGameAdminPage = () => createSelector<IStore, IGameAdminPage | undefined, IGameAdminPage>(
  getGameAdminState,
  (state: IGameAdminPage) => {
    return state;
  },
);
