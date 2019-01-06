import { Action } from 'redux';
import { Notifications } from '../../types/constants';
import * as constants from './constants';

export interface INotificationAction extends Action {
  message: string;
  notificationType: Notifications;
  type: constants.NOTIFICATION;
}

export function notify(notificationType: Notifications, message: string) : INotificationAction {
  return {
    message,
    notificationType,
    type: constants.NOTIFICATION,
  };
}

export type NotificationActions = INotificationAction | undefined;
