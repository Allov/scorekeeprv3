import { INotification } from '../../../types';
import { Notifications } from '../../../types/constants';
import * as actions from '../actions';
import { notificationsReducer } from '../reducer';

it('returns the initial state', () => {
  const expectedState: INotification[] = [];

  expect(notificationsReducer(undefined, undefined)).toEqual(expectedState);
});

it('returns the state with a new notification of type Notifications.Error', () => {
  const notificationType = Notifications.Error;
  const message = 'dont-care';
  const expectedState: INotification[] = [{
    message,
    type: notificationType,
  }];

  const state: INotification[] = [];

  expect(notificationsReducer(state, actions.notify(notificationType, message))).toEqual(expectedState);
});
