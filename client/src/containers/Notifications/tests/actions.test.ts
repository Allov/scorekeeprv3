import { Notifications } from '../../../types/constants';
import * as actions from '../actions';
import * as constants from '../constants';

it('dispatches the correct notify action type', () => {
  const message = 'dont-care';
  const notificationType = Notifications.Error;
  const expectedResult: actions.INotificationAction = {
    message,
    notificationType,
    type: constants.NOTIFICATION,
  };

  expect(actions.notify(notificationType, message)).toEqual(expectedResult);
});
