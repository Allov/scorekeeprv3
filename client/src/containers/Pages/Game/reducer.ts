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
  ISubscribedToGameAction,
  GameActions,
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


const fetchedGameHandler = (state: IGamePageRecord, action: IFetchedGameAction) => {
  return state.mergeIn(['game'], action.game);
};

const editedPlayerNameHandler = (state: IGamePageRecord, action: IEditedPlayerNameAction) => {
  const playerIndex = state.game.players!.findIndex(p => p.id === action.id);

  return state
    // edit in scores
    .updateIn([
      'game',
      'rounds',
      state.game.currentRound! - 1,
      'scores',
      playerIndex,
      'player',
      'name'
    ],
      () => action.name
    )
    // edit in player.
    .updateIn([
      'game',
      'players',
      playerIndex,
      'name',
    ],
      () => action.name
    );
};

const deletedPlayerFromGameHandler = (state: IGamePageRecord, action: IDeletePlayerFromGame) => {
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
};

const editedPlayerPointsHandler = (state: IGamePageRecord, action: IEditedPlayerPointsAction) => {
  const playerIndex = state.game.players!.findIndex(p => p.id === action.id);

  return state
    .setIn([
      'game',
      'rounds',
      state.game.currentRound! - 1,
      'scores',
      playerIndex,
      'points',
    ],
      action.points
    );
};

const addPlayerToGameHandler = (state: IGamePageRecord, action: IAddPlayerToGameAction) => {
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
};

const subscribedToGameHandler = (state: IGamePageRecord, action: ISubscribedToGameAction) => {
  return state.mergeIn(['game'], action.game);
};

const subscribedGameUpdatedHandler = (state: IGamePageRecord, action: ISubscribedGameUpdatedAction) => {
  return state.mergeIn(['game'], action.game);
};

export function gameReducer(state: IGamePageRecord = initialState, action: GameActions): IGamePageRecord {
  if (!action) { return state };

  switch (action!.type) {
    case FETCHED_GAME:
      return fetchedGameHandler(state, action as IFetchedGameAction);
    case ADDPLAYERTO_GAME:
      return addPlayerToGameHandler(state, action as IAddPlayerToGameAction);
    case DELETEPLAYERFROM_GAME:
      return deletedPlayerFromGameHandler(state, action as IDeletePlayerFromGame);
    case EDITEDPLAYER_NAME:
      return editedPlayerNameHandler(state, action as IEditedPlayerNameAction);
    case EDITEDPLAYER_POINTS:
      return editedPlayerPointsHandler(state, action as IEditedPlayerPointsAction);
    case SUBSCRIBEDGAME_UPDATE:
      return subscribedGameUpdatedHandler(state, action as ISubscribedGameUpdatedAction);
    case SUBSCRIBEDTO_GAME:
      return subscribedToGameHandler(state, action as ISubscribedToGameAction);
  }

  return state;
}
