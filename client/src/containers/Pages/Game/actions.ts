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

export interface IEditedPlayerNameAction extends Action {
  id: string,
  name: string;
}

export function editedPlayerName(id: string, name: string): IEditedPlayerNameAction {
  return {
    id,
    name,
    type: constants.EDITEDPLAYER_NAME,
  };
}

export interface IEditedPlayerPointsAction extends Action {
  id: string,
  points: string;
}

export function editedPlayerPoints(id: string, points: string): IEditedPlayerPointsAction {
  return {
    id,
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

export interface ISubscribeToGameAction extends Action {
  shareId: string;
  type: constants.SUBSCRIBETO_GAME;
}

export function subscribeToGame(shareId: string): ISubscribeToGameAction {
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


export type GameActions =
  IFetchGameAction |
  IFetchedGameAction |
  IAddPlayerToGameAction |
  IAddedPlayerToGameAction |
  IEditedPlayerNameAction |
  IEditedPlayerPointsAction |
  IDeletePlayerFromGame |
  ISubscribeToGameAction |
  ISubscribedToGameAction |
  ISubscribedGameUpdatedAction |
  undefined;
