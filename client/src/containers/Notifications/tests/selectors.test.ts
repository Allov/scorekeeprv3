import { IStore } from '../../../types';
import { Notifications } from '../../../types/constants';
import { makeSelectNotifications } from '../selectors';

it('returns all the notifications', () => {
  const state: IStore = {
    notifications: [{
      message: 'dont-care',
      type: Notifications.Error,
    }, {
      message: 'dont-care2',
      type: Notifications.Warning,
    }]
  };

  const notificationsSelector = makeSelectNotifications();

  expect(notificationsSelector(state)).toHaveLength(state.notifications!.length);
});
