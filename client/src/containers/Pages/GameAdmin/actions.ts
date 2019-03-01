import { Action } from 'redux';
import { IGame, IIndexedAction } from '../../../types';
import * as constants from './constants';

export interface IFetchGameAction extends Action {
  shareId: string;
  type: constants.FETCH_GAME;
}

export function fetchGame(shareId: string): IFetchGameAction {
  return {
    shareId,
    type: constants.FETCH_GAME,
  };
}

export interface IFetchedGameAction extends Action {
  game: IGame;
  type: constants.FETCHED_GAME;
}

export function fetchedGame(game: IGame): IFetchedGameAction {
  return {
    game,
    type: constants.FETCHED_GAME,
  };
}

export interface IAddPlayerToGameAction extends Action {
  gameId: string;
  name: string;
}

export function addPlayerToGame(gameId: string, name: string): IAddPlayerToGameAction {
  return {
    gameId,
    name,
    type: constants.ADDPLAYERTO_GAME,
  };
}

export interface IAddedPlayerToGameAction extends Action {
  game: IGame;
}

export function addedPlayerToGame(game: IGame): IAddedPlayerToGameAction {
  return {
    game,
    type: constants.ADDEDPLAYERTO_GAME,
  };
}

export interface IEditedPlayerNameAction extends Action, IIndexedAction {
  name: string;
}

export function editedPlayerName(index: number, name: string): IEditedPlayerNameAction {
  return {
    index,
    name,
    type: constants.EDITEDPLAYER_NAME,
  };
}

export interface IEditedPlayerPointsAction extends Action, IIndexedAction {
  points: string;
}

export function editedPlayerPoints(index: number, points: string): IEditedPlayerPointsAction {
  return {
    index,
    points,
    type: constants.EDITEDPLAYER_POINTS,
  };
}

export interface IDeletePlayerFromGame extends Action {
  id: string,
}

export function deletePlayerFromGame(id: string): IDeletePlayerFromGame {
  return {
    id,
    type: constants.DELETEPLAYERFROM_GAME,
  };
}

export type GameAdminActions =
  IFetchGameAction |
  IFetchedGameAction |
  IAddPlayerToGameAction |
  IAddedPlayerToGameAction |
  IEditedPlayerNameAction |
  IEditedPlayerPointsAction |
  IDeletePlayerFromGame |
  undefined;
