import { Action } from 'redux';
import * as constants from './constants';

export interface IConfigureThemeAction extends Action {
  theme: string;
  type: constants.CONFIGURE_THEME;
}

export function createGame(theme: string) : IConfigureThemeAction {
  return {
    theme,
    type: constants.CONFIGURE_THEME,
  };
}



export type ScorekeeprActions = IConfigureThemeAction;


