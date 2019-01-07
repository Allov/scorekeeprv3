import { gql } from 'apollo-boost';
import { call, put, takeLatest } from 'redux-saga/effects';
import client from '../../../lib/apollo';
import { Notifications } from '../../../types/constants';
import { notify } from '../../Notifications/actions';
import { fetchedGame, IFetchGameAction } from './actions';
import { FETCH_GAME } from './constants';

const QUERY = gql`
  query GameByShareId($shareId: String!) {
    gameByShareId(shareId: $shareId) {
      id,
      name,
      shareId,
      createdBy {
        username
      }
    }
  }
`;

export function* fetchGame(action: IFetchGameAction) {
  try {
    const result = yield call(client.query, { query: QUERY, variables: { shareId: action.shareId } });

    if (!result.data.gameByShareId) {
      yield put(notify(Notifications.Error, `Could not find game: ${action.shareId}`));
    } else {
      yield put(fetchedGame(result.data.gameByShareId));
    }
  } catch(error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `Could not fetch game: ${error.message}`));
  }
}

export const gameAdminSagas = [
  takeLatest(FETCH_GAME, fetchGame),
];
