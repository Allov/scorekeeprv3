import { createSelector } from 'reselect';
import { INotification, IStore } from '../../types';

const getNotificationsState = (state: IStore) => state.notifications;

export const makeSelectNotifications = () => createSelector<IStore, INotification[] | undefined, INotification[]>(
  getNotificationsState,
  (state: INotification[]) => {
    return state;
  },
);
