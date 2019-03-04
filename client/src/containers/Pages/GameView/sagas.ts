import { Observable } from 'apollo-client/util/Observable';
import gql from 'graphql-tag';
import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import Client from '../../../lib/apollo';
import { IGame } from '../../../types';
import { ISubscribeGameAction, subscribedGameUpdated } from './actions';
import { SUBSCRIBETO_GAME } from './constants';

const GAME_FRAGMENT = gql`
  fragment GameFields on Game {
    id,
    name,
    shareId,
    players {
      id,
      name,
    }
    rounds {
      id,
      roundNumber,
      scores {
        points,
        player {
          id,
          name,
          totalScore,
        }
      }
    },
    createdBy {
      username
    }
  }
`;

const SUBSCRIBETO_GAME_UPDATES = gql`
  subscription gameUpdated($shareId: String!) {
    gameUpdated(shareId: $shareId) {
      ...GameFields,
    }
  }

  ${GAME_FRAGMENT}
`;

interface ISubscribeToGameVariables {
  shareId: string;
}

interface IObserver<T> {
  data: T;
}

interface IGameUpdateObserver {
  gameUpdated: IGame;
}

export function subscribeToGameUpdates(subscription: Observable<IObserver<IGameUpdateObserver>>) {
  return eventChannel(emit => {

    const querySubscription = subscription.subscribe(observer => {
      emit(observer.data.gameUpdated);
    });

    return () => querySubscription.unsubscribe();
  });
}

export function* manageGameUpdateSubscription(action: ISubscribeGameAction) {
  const variables: ISubscribeToGameVariables = {
    shareId: action.shareId,
  }

  const subscription: Observable<IObserver<IGameUpdateObserver>> = yield call([Client, Client.subscribe], { query: SUBSCRIBETO_GAME_UPDATES, variables });
  const channel = yield call(subscribeToGameUpdates, subscription);

  try {
    while(true) {
      const game = yield take(channel);
      yield put(subscribedGameUpdated(game));
    }
  } catch(error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

export const gameViewSagas = [
  takeLatest(SUBSCRIBETO_GAME, manageGameUpdateSubscription),
];
