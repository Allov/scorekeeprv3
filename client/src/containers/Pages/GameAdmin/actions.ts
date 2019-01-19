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

export interface IAddPlayerToGameAction extends Action {
  gameId: string;
  name: string;
}

export function addPlayerToGame(gameId: string, name: string) {
  return {
    gameId,
    name,
    type: constants.ADDPLAYERTO_GAME,
  };
}

export interface IAddedPlayerToGameAction extends Action {
  game: IGame;
}

export function addedPlayerToGame(game: IGame) {
  return {
    game,
    type: constants.ADDEDPLAYERTO_GAME,
  };
}

export type GameAdminActions = IFetchGameAction | IFetchedGameAction | undefined;
