import { gql } from 'apollo-boost';
import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import client from '../../../lib/apollo';
import { Notifications } from '../../../types/constants';
import { notify } from '../../Notifications/actions';
import { CREATE_GAME } from './constants';

const QUERY = gql`
  mutation {
    addGame(input: {
      name: "anonymous game",
      userId: null,
    }) {
      shareId
    }
  }
`;

export function* createGame() {

  try {
    const result = yield call(client.mutate, { mutation: QUERY });
    // todo: type result.
    yield put(push(`/game/${result.data.addGame.shareId}`));
  } catch(error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `Could not create game: ${error.message}`));
  }
}

export const createSagas = [
  takeLatest(CREATE_GAME, createGame),
];
