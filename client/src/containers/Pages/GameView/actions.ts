import { Action } from 'redux';
import { IGame } from 'src/types';
import * as constants from './constants';

export interface ISubscribeGameAction extends Action {
  shareId: string;
  type: constants.SUBSCRIBETO_GAME;
}

export function subscribeToGame(shareId: string): ISubscribeGameAction {
  return {
    shareId,
    type: constants.SUBSCRIBETO_GAME,
  };
}

export interface ISubscribedToGameAction extends Action {
  game: IGame;
  type: constants.SUBSCRIBEDTO_GAME;
}

export function subscribedToGame(game: IGame): ISubscribedToGameAction {
  return {
    game,
    type: constants.SUBSCRIBEDTO_GAME,
  };
}

export interface ISubscribedGameUpdatedAction extends Action {
  game: IGame;
  type: constants.SUBSCRIBEDGAME_UPDATE;
}

export function subscribedGameUpdated(game: IGame): ISubscribedGameUpdatedAction {
  return {
    game,
    type: constants.SUBSCRIBEDGAME_UPDATE,
  };
}
