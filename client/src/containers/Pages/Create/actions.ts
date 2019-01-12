import { Action } from 'redux';
import * as constants from './constants';

export interface ICreateGameAction extends Action {
  name: string;
  type: constants.CREATE_GAME;
  userId: string | undefined;
}

export function createGame(name: string, userId: string | undefined) : ICreateGameAction {
  return {
    name,
    type: constants.CREATE_GAME,
    userId,
  };
}

export type CreateGameActions = ICreateGameAction | undefined;
