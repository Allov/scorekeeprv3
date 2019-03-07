import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import { Notifications } from '../../../../types/constants';
import { notify } from '../../../Notifications/actions';
import { createGame } from '../sagas';

let createGameGenerator = createGame();

beforeEach(() => {
  createGameGenerator = createGame();
  const callDescriptor = createGameGenerator.next().value;
  expect(callDescriptor).toMatchSnapshot();
})

it('dispatch the push action if game was created correctly', () => {
  const shareId = 'dont-care';
  const result = {
    data: {
      createGame: {
        shareId,
      }
    }
  };

  const putDescriptor = createGameGenerator.next(result).value;
  expect(putDescriptor).toEqual(put(push(`/game/${shareId}/admin`)));
});

it('dispatch a notification error on error', () => {
  const response = new Error('Woops');
  // compiler gives 'cannot invoke an object which is possibly 'undefined'' and I can't find anything to fix this to save my life.
  // casting createGameGenerator as any here fixes the compiler error and the code runs just fine.
  const putDescriptor = (createGameGenerator as any).throw(response).value;

  expect(putDescriptor).toEqual(put(notify(Notifications.Error, `Could not create game: ${response.message}`)));
});
