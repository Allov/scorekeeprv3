import { INotification } from '../../types';
import { INotificationAction, NotificationActions } from './actions';
import { NOTIFICATION } from './constants';

const initialState: INotification[] = [];

const actions: Map<NOTIFICATION, (state: INotification[], action: INotificationAction) => INotification[]> = new Map();
actions.set(NOTIFICATION, (state: INotification[], action: INotificationAction) => {
  const newState = [...state];
  newState.push({
    message: action.message,
    type: action.notificationType,
  });

  return newState;
});

export function notificationsReducer(state: INotification[] = initialState, action: NotificationActions): INotification[] {
  if (!action || !actions.has(action.type)) { return state; }
  return actions.get(action.type)!(state, action);
}
