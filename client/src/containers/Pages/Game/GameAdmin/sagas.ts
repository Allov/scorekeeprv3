import { gql } from 'apollo-boost';
import { put, select, takeLatest, throttle } from 'redux-saga/effects';
import { IRound } from '../../../../types';
import { safeMutate, safeQuery } from '../../../../lib/saga';
import { Notifications } from '../../../../types/constants';
import { notify } from '../../../Notifications/actions';
import { fetchedGame, IAddPlayerToGameAction, IDeletePlayerFromGame, IEditedPlayerNameAction, IEditedPlayerPointsAction, IFetchGameAction } from '../actions';
import { ADDPLAYERTO_GAME, DELETEPLAYERFROM_GAME, EDITEDPLAYER_NAME, EDITEDPLAYER_POINTS, FETCH_GAME } from '../constants';
import { makeSelectGameCurrentRound, makeSelectGameId, makeSelectPlayerId } from '../selectors';

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

const FETCH_GAME_BY_SHAREID = gql`
  query GameByShareId($shareId: String!) {
    gameByShareId(shareId: $shareId) {
      ...GameFields,
    }
  }

  ${GAME_FRAGMENT}
`;

export function* fetchGame(action: IFetchGameAction) {
  const result = yield safeQuery(FETCH_GAME_BY_SHAREID, {
    shareId: action.shareId,
  },
    'Could not fetch game');

  if (!result.gameByShareId) {
    yield put(notify(Notifications.Error, `Could not find game: ${action.shareId}`));
  } else {
    yield put(fetchedGame(result.gameByShareId));
  }
}

const ADD_PLAYER = gql`
  mutation AddPlayerToGame($input: PlayerInput!) {
    addPlayerToGame(input: $input) {
      ...GameFields,
    }
  }

  ${GAME_FRAGMENT}
`;

export function* addPlayerToGame(action: IAddPlayerToGameAction) {
  const result = yield safeMutate(ADD_PLAYER, {
    input: {
      gameId: action.gameId,
      name: action.name,
    },
  },
    'Could not add player to game'
  );

  // since playerId is generated on the server side, let's synchronise the game.
  // new player should be already added in the array with the same name unless it was so fast and began typing a name.
  yield put(fetchedGame(result.addPlayerToGame));
}

const UPDATE_PLAYER = gql`
  mutation updatePlayer($playerId: String!, $input: PlayerInput!) {
    updatePlayer(id: $playerId, input: $input) {
      id,
    }
  }
`;

export function* editedPlayerName(action: IEditedPlayerNameAction) {
  const gameId = yield select(makeSelectGameId());
  const playerId = action.id;

  yield safeMutate(UPDATE_PLAYER, {
    input: {
      gameId,
      name: action.name,
    },
    playerId,
  },
    'Could not edit player name'
  );
}

const UPDATE_SCORES = gql`
  mutation updateScores($input: ScoresInput!) {
    updateScores(input: $input) {
      id,
    }
  }
`;

export function* editedPlayerPoints(action: IEditedPlayerPointsAction) {
  const gameId = yield select(makeSelectGameId());
  const round: IRound = yield select(makeSelectGameCurrentRound());
  const playerId = action.id;

  yield safeMutate(UPDATE_SCORES, {
    input: {
      filter: {
        gameId,
        roundId: round.id,
      },
      scores: [{
        playerId,
        points: Number(action.points),
      }],
    },
  },
    'Could not update player score'
  );
}

const DELETE_PLAYER = gql`
  mutation deletePlayerFromGame($playerId: String!, $gameId: String!) {
    deletePlayer(id: $playerId, gameId: $gameId) {
      id
    }
  }
`;

export function* deletedPlayerFromGame(action: IDeletePlayerFromGame) {
  const gameId = yield select(makeSelectGameId());

  yield safeMutate(DELETE_PLAYER, {
    gameId,
    playerId: action.id,
  },
    'Could not delete player'
  );
}

export const gameAdminSagas = [
  takeLatest(FETCH_GAME, fetchGame),
  takeLatest(ADDPLAYERTO_GAME, addPlayerToGame),
  throttle(500, EDITEDPLAYER_NAME, editedPlayerName),
  takeLatest(EDITEDPLAYER_POINTS, editedPlayerPoints),
  takeLatest(DELETEPLAYERFROM_GAME, deletedPlayerFromGame),
];
