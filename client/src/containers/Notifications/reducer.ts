import { INotification } from '../../types';
import { INotificationAction, NotificationActions } from './actions';
import { NOTIFICATION } from './constants';

const initialState: INotification[] = [];

const actions: NOTIFICATION[] = [];
actions[NOTIFICATION] = (state: INotification[], action: INotificationAction) => {
  const newState = [...state];
  newState.push({
    message: action.message,
    type: action.notificationType,
  });

  return newState;
}

export function notificationsReducer(state: INotification[] = initialState, action: NotificationActions): INotification[] {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
