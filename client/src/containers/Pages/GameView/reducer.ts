import { Record } from 'immutable';
import { IGame, IPage } from '../../../types';
import { ISubscribedGameUpdatedAction, ISubscribedToGameAction } from './actions';
import { SUBSCRIBEDGAME_UPDATE, SUBSCRIBEDTO_GAME } from './constants';

export interface IGameViewPage extends IPage {
  game: IGame;
}

export interface IGameViewPageRecord extends Record<IGameViewPage>, IGameViewPage { };

export const defaultState: IGameViewPage = {
  data: {},
  game: {
    createdBy: '',
    currentRound: 1,
    id: '',
    name: '',
    players: [],
    shareId: '',
  },
  title: 'Game View',
};

export const initialState: IGameViewPageRecord = Record<IGameViewPage>(defaultState)();

const actions: SUBSCRIBEDTO_GAME[] | SUBSCRIBEDGAME_UPDATE[] = [];
actions[SUBSCRIBEDTO_GAME] = (state: IGameViewPageRecord, action: ISubscribedToGameAction) => {
  return state.mergeIn(['game'], action.game);
};

actions[SUBSCRIBEDGAME_UPDATE] = (state: IGameViewPageRecord, action: ISubscribedGameUpdatedAction) => {
  return state.mergeIn(['game'], action.game);
};

export function gameViewReducer(state: IGameViewPageRecord = initialState, action: ISubscribedToGameAction | undefined): IGameViewPageRecord {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}


