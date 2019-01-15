import { gql } from 'apollo-boost';
import { call, put, takeLatest } from 'redux-saga/effects';
import client from '../../../lib/apollo';
import { Notifications } from '../../../types/constants';
import { notify } from '../../Notifications/actions';
import { fetchedGame, IAddPlayerToGameAction, IFetchGameAction } from './actions';
import { ADDPLAYERTO_GAME, FETCH_GAME } from './constants';

const GAME_FRAGMENT = gql`
  fragment GameFields on Game {
    id,
    name,
    shareId,
    rounds {
      roundNumber,
      scores {
        points,
        player {
          name
        }
      }
    },
    createdBy {
      username
    }
  }
`;

const FETCH_GAME_BY_SHAREID = gql`
  query GameByShareId($shareId: String!) {
    gameByShareId(shareId: $shareId) {
      ...GameFields,
    }
  }

  ${GAME_FRAGMENT}
`;

export function* fetchGame(action: IFetchGameAction) {
  try {
    const result = yield call(client.query, {
      query: FETCH_GAME_BY_SHAREID,
      variables: {
        shareId: action.shareId,
      },
    });

    if (!result.data.gameByShareId) {
      yield put(notify(Notifications.Error, `Could not find game: ${action.shareId}`));
    } else {
      yield put(fetchedGame(result.data.gameByShareId));
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `Could not fetch game: ${error.message}`));
  }
}

const ADD_PLAYER = gql`
  mutation AddPlayerToGame($input: PlayerInput!) {
    addPlayerToGame(input: $input) {
      game {
        ...GameFields
      }
    }
  }

  ${GAME_FRAGMENT}
`;

export function* addPlayerToGame(action: IAddPlayerToGameAction) {
  try {
    const variables = {
      input: {
        gameId: action.gameId,
        name: action.name,
      },
    };

    const result = yield call(client.mutate, {
      mutation: ADD_PLAYER,
      variables
    });

    yield put(fetchedGame(result.data.addPlayerToGame.game));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `Could not add player to game: ${error.message}`));
  }
}

export const gameAdminSagas = [
  takeLatest(FETCH_GAME, fetchGame),
  takeLatest(ADDPLAYERTO_GAME, addPlayerToGame),
];
