import { Action } from 'redux';
import * as constants from './constants';

export interface IConfigureTheme extends Action {
  type: constants.CONFIGURE_THEME;
  theme: string;
}

export type ScorekeeprActions = IConfigureTheme;

export function createGame(theme: string) : IConfigureTheme {
  return {
    theme,
    type: constants.CONFIGURE_THEME,
  };
}
