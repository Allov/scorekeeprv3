import { Action } from 'redux';
import * as constants from './constants';
import { IGameInput } from '../../../types';

export interface ICreateGameAction extends Action {
  type: constants.CREATE_GAME;
}

export function createGame() : ICreateGameAction {
  return {
    type: constants.CREATE_GAME,
  };
}

export interface IInputChanged extends Action {
  input: IGameInput;
}

export function inputChanged(input: IGameInput) : IInputChanged {
  return {
    input,
    type: constants.INPUT_CHANGED,
  };
}

export interface ISetGameName extends Action {
  name: string;
}

export function setGameName(name: string) : ISetGameName {
  return {
    name,
    type: constants.SET_GAME_NAME,
  };
}

export interface ISetGameNumberOfPlayers extends Action {
  numberOfPlayers: number;
}

export function setGameNumberOfPlayers(numberOfPlayers: number) : ISetGameNumberOfPlayers {
  return {
    numberOfPlayers,
    type: constants.SET_GAME_NUMBEROFPLAYERS,
  };
}

export type CreateGameActions = ICreateGameAction | IInputChanged | ISetGameName | ISetGameNumberOfPlayers | undefined;
