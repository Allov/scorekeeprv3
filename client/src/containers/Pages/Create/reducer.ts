import { Record } from 'immutable';
import sillyname from 'sillyname';
import { IPage, IGameInput } from '../../../types';

import {
  ISetGameName,
  ISetGameNumberOfPlayers,
  CreateGameActions,
} from './actions';

import * as constants from './constants';


export interface ICreateGamePage extends IPage {
  input: IGameInput;
}

export interface ICreateGamePageRecord extends Record<ICreateGamePage>, ICreateGamePage { };

export const defaultState: ICreateGamePage = {
  data: null,
  input: {
    name: sillyname(),
    numberOfPlayers: 4,
  },
  title: 'Create Game'
}

const setGameNameHandler = (state: ICreateGamePageRecord, action: ISetGameName) => {
  return state.setIn([
    'input',
    'name',
  ],
    action.name
  );
}

const setGameNumberOfPlayersHandler = (state: ICreateGamePageRecord, action: ISetGameNumberOfPlayers) => {
  return state.setIn([
    'input',
    'numberOfPlayers',
  ],
    action.numberOfPlayers
  );
}

export const initialState: ICreateGamePageRecord = Record<ICreateGamePage>(defaultState)();

export function createGameReducer(state: ICreateGamePageRecord = initialState, action: CreateGameActions): ICreateGamePageRecord {
  if (!action) { return state };

  switch (action!.type) {
    case constants.SET_GAME_NAME:
      return setGameNameHandler(state, action as ISetGameName);
    case constants.SET_GAME_NUMBEROFPLAYERS:
      return setGameNumberOfPlayersHandler(state, action as ISetGameNumberOfPlayers);
  }

  return state;
}
