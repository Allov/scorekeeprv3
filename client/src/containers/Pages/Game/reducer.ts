import { Record } from 'immutable';
import {
  IGame,
  IPage,
  IScore
} from '../../../types';

import {
  IAddPlayerToGameAction,
  IDeletePlayerFromGame,
  IEditedPlayerNameAction,
  IEditedPlayerPointsAction,
  IFetchedGameAction,
  ISubscribedGameUpdatedAction,
  ISubscribedToGameAction
} from './actions';

import {
  ADDPLAYERTO_GAME,
  DELETEPLAYERFROM_GAME,
  EDITEDPLAYER_NAME,
  EDITEDPLAYER_POINTS,
  FETCHED_GAME,
  SUBSCRIBEDGAME_UPDATE,
  SUBSCRIBEDTO_GAME
} from './constants';

export interface IGamePage extends IPage {
  game: IGame;
}

export interface IGamePageRecord extends Record<IGamePage>, IGamePage { };

export const defaultState: IGamePage = {
  data: {},
  game: {
    createdBy: '',
    currentRound: 1,
    id: '',
    name: '',
    players: [],
    shareId: '',
  },
  title: 'Game Admin',
};

export const initialState: IGamePageRecord = Record<IGamePage>(defaultState)();

const actions: FETCHED_GAME[] | EDITEDPLAYER_NAME[] | ADDPLAYERTO_GAME[] | SUBSCRIBEDTO_GAME[] | SUBSCRIBEDGAME_UPDATE[] = [];
actions[FETCHED_GAME] = (state: IGamePageRecord, action: IFetchedGameAction) => {
  return state.mergeIn(['game'], action.game);
};

actions[EDITEDPLAYER_NAME] = (state: IGamePageRecord, action: IEditedPlayerNameAction) => {
  return state
    // edit in scores
    .updateIn([
      'game',
      'rounds',
      state.game.currentRound! - 1,
      'scores',
      action.index,
      'player',
      'name'
    ],
      () => action.name
    )
    // edit in player.
    .updateIn([
      'game',
      'players',
      action.index,
      'name',
    ],
      () => action.name
    );
}

actions[DELETEPLAYERFROM_GAME] = (state: IGamePageRecord, action: IDeletePlayerFromGame) => {
  const playerIndex = state.game.players!.findIndex(p => p.id === action.id);

  return state
    // remove from scores.
    .removeIn([
      'game',
      'rounds',
      state.game.currentRound! - 1,
      'scores',
      playerIndex,
    ])
    // remove from player list.
    .removeIn([
      'game',
      'players',
      playerIndex,
    ]);
}

actions[EDITEDPLAYER_POINTS] = (state: IGamePageRecord, action: IEditedPlayerPointsAction) => {
  return state
    .setIn([
      'game',
      'rounds',
      state.game.currentRound! - 1,
      'scores',
      action.index,
      'points',
    ],
      action.points
    );
}

actions[ADDPLAYERTO_GAME] = (state: IGamePageRecord, action: IAddPlayerToGameAction) => {
  return state.updateIn([
    'game',
    'rounds',
    state.game.currentRound! - 1,
    'scores'
  ], (scores: IScore[]) => {
    return scores.concat({
      player: {
        id: '',
        name: action.name,
        totalScore: 0,
      },
      points: 0,
    });
  });
}

actions[SUBSCRIBEDTO_GAME] = (state: IGamePageRecord, action: ISubscribedToGameAction) => {
  return state.mergeIn(['game'], action.game);
};

actions[SUBSCRIBEDGAME_UPDATE] = (state: IGamePageRecord, action: ISubscribedGameUpdatedAction) => {
  return state.mergeIn(['game'], action.game);
};

export function gameReducer(state: IGamePageRecord = initialState, action: IFetchedGameAction | undefined): IGamePageRecord {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
