import * as constants from '../constants';

export interface ICreateGame {
  type: constants.CREATE_GAME;
  name: string;
}

export interface IFetchHelloworld {
  type: constants.FETCH_HELLOWORLD;
}

export type ScorekeeprActions = ICreateGame | IFetchHelloworld;

export function createGame(name: string) : ICreateGame {
  return {
    name,
    type: constants.CREATE_GAME,
  }
}

export function fetchHelloworld() : IFetchHelloworld {
  return {
    type: constants.FETCH_HELLOWORLD,
  }
}
