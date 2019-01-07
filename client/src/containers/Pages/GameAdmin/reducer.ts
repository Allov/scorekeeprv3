import { IGame, IPage } from '../../../types';
import { IFetchedGameAction } from './actions';
import { FETCHED_GAME } from './constants';

export interface IGameAdminPage extends IPage {
  game: IGame;
}

export const initialState: IGameAdminPage = {
  data: {},
  game: {
    createdBy: '',
    id: '',
    name: '',
    shareId: '',
  },
  title: 'Game Admin',
};

const actions: FETCHED_GAME[] = [];
actions[FETCHED_GAME] = (state: IGame, action: IFetchedGameAction) => {
  return {
    ...state,
    game: action.game,
  };
}

export function gameAdminReducer(state: IGameAdminPage = initialState, action: IFetchedGameAction | undefined): IGameAdminPage {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
