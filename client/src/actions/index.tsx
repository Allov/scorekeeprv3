import * as constants from '../constants';

export interface ICreateGame {
  type: constants.CREATE_GAME;
  name: string;
}

export type ScorekeeprActions = ICreateGame;

export function createGame(name: string): ICreateGame {
  return {
    name,
    type: constants.CREATE_GAME,
  }
}
