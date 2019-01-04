import { ICreateGame } from './actions';
import { CREATE_GAME } from './constants';
import { IGame } from './types';

const initialState: IGame = {
  name: '',
  shareId: '',
}

export function game(state: IGame = initialState, action: ICreateGame): IGame {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        name: action.name,
        shareId: '',
      };
  }
  return state;
}
