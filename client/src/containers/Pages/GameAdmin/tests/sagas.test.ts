import { put } from 'redux-saga/effects';
import { IGame } from '../../../../types';
import { Notifications } from '../../../../types/constants';
import { notify } from '../../../Notifications/actions';
import { fetchedGame, fetchGame as fetchGameAction } from '../actions';
import { fetchGame } from '../sagas';

const shareId = 'dont-care';
let fetchGameGenerator = fetchGame(fetchGameAction(shareId));

beforeEach(() => {
  fetchGameGenerator = fetchGame(fetchGameAction(shareId));
  const callDescriptor = fetchGameGenerator.next().value;
  expect(callDescriptor).toMatchSnapshot();
})

it('dispatch the fetchedGame action if game was fetch correctly', () => {
  const gameByShareId: IGame = {
    createdBy: '',
    id: '',
    name: '',
    shareId,
  };

  const result = {
    data: {
      gameByShareId,
    }
  };

  const putDescriptor = fetchGameGenerator.next(result).value;
  expect(putDescriptor).toEqual(put(fetchedGame(gameByShareId)));
});

it('dispatch a notification error when no game was returned', () => {
  const gameByShareId: IGame | undefined = undefined;

  const result = {
    data: {
      gameByShareId,
    }
  };

  const putDescriptor = fetchGameGenerator.next(result).value;
  expect(putDescriptor).toEqual(put(notify(Notifications.Error, `Could not find game: ${shareId}`)));
});

it('dispatch a notification error on error', () => {
  const response = new Error('Woops');
  // compiler gives 'cannot invoke an object which is possibly 'undefined'' and I can't find anything to fix this to save my life.
  // casting createGameGenerator as any here fixes the compiler error and the code runs just fine.
  const putDescriptor = (fetchGameGenerator as any).throw(response).value;

  expect(putDescriptor).toEqual(put(notify(Notifications.Error, `Could not fetch game: ${response.message}`)));
});
