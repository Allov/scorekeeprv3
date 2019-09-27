import { gql } from 'apollo-boost';
import { push } from 'connected-react-router';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import client from '../../../lib/apollo';
import { Notifications } from '../../../types/constants';
import { notify } from '../../Notifications/actions';
import { CREATE_GAME } from './constants';
import { makeSelectCreateGameInput } from './selectors';
import { safeMutate } from '../../../lib/saga';

const QUERY = gql`
  mutation CreateGame($input: GameInput!) {
    createGame(input: $input) {
      shareId
    }
  }
`;

export function* createGame() {
  try {
    const input = yield select(makeSelectCreateGameInput());
    const result = yield safeMutate(QUERY, { input }, 'Could not create game.');
    // todo: type result.
    // todo: validate if game has been created correctly?
    yield put(push(`/game/${result.createGame.shareId}/admin`));
  } catch(error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `Could not create game: ${error.message}`));
  }
}

export const createSagas = [
  takeLatest(CREATE_GAME, createGame),
];
