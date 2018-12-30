import { ICreateGame } from '../actions';
import { CREATE_GAME } from '../constants';
import { IStore } from '../types';

export function game(state: IStore, action: ICreateGame): IStore {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state, me: { id: '', name: action.name }};
  }
  return state;
}
