import { Action } from 'redux';
import { IGame } from '../../../types';
import * as constants from './constants';

export interface IFetchGameAction extends Action {
  shareId: string;
  type: constants.FETCH_GAME;
}

export function fetchGame(shareId: string) : IFetchGameAction {
  return {
    shareId,
    type: constants.FETCH_GAME,
  };
}

export interface IFetchedGameAction extends Action {
  game: IGame;
  type: constants.FETCHED_GAME;
}

export function fetchedGame(game: IGame) : IFetchedGameAction {
  return {
    game,
    type: constants.FETCHED_GAME,
  };
}

export type GameAdminActions = IFetchGameAction | IFetchedGameAction | undefined;
