import { IStore } from '../../types';
import { createSelector } from 'reselect';
import { RouterState } from 'connected-react-router';

const getRouterState = (state: IStore) => state.router;

export const makeSelectPathname = () => createSelector<IStore, RouterState | undefined, string>(
  getRouterState,
  (state: RouterState) => state.location.pathname,
);

export const makeSelectAction = () => createSelector<IStore, RouterState | undefined, string>(
  getRouterState,
  (state: RouterState) => state.action,
);
