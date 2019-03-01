import { Record } from 'immutable';
import { IGame, IPage, IScore } from '../../../types';
import { IAddPlayerToGameAction, IDeletePlayerFromGame, IEditedPlayerNameAction, IEditedPlayerPointsAction, IFetchedGameAction } from './actions';
import { ADDPLAYERTO_GAME, DELETEPLAYERFROM_GAME, EDITEDPLAYER_NAME, EDITEDPLAYER_POINTS, FETCHED_GAME } from './constants';

export interface IGameAdminPage extends IPage {
  game: IGame;
}

export interface IGameAdminPageRecord extends Record<IGameAdminPage>, IGameAdminPage { };

export const defaultState: IGameAdminPage = {
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

export const initialState: IGameAdminPageRecord = Record<IGameAdminPage>(defaultState)();

const actions: FETCHED_GAME | EDITEDPLAYER_NAME | ADDPLAYERTO_GAME[] = [];
actions[FETCHED_GAME] = (state: IGameAdminPageRecord, action: IFetchedGameAction) => {
  return state.mergeIn(['game'], action.game);
};

actions[EDITEDPLAYER_NAME] = (state: IGameAdminPageRecord, action: IEditedPlayerNameAction) => {
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

actions[DELETEPLAYERFROM_GAME] = (state: IGameAdminPageRecord, action: IDeletePlayerFromGame) => {
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

actions[EDITEDPLAYER_POINTS] = (state: IGameAdminPageRecord, action: IEditedPlayerPointsAction) => {
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

actions[ADDPLAYERTO_GAME] = (state: IGameAdminPageRecord, action: IAddPlayerToGameAction) => {
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


export function gameAdminReducer(state: IGameAdminPageRecord = initialState, action: IFetchedGameAction | undefined): IGameAdminPageRecord {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
