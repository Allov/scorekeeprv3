import { IConfiguration } from '../../types';
import { IConfigureThemeAction } from './actions';
import { CONFIGURE_THEME } from './constants';

const initialState: IConfiguration = {
  theme: 'day',
};

const actions: CONFIGURE_THEME[] = [];
actions[CONFIGURE_THEME] = (state: IConfiguration, action: IConfigureThemeAction) => {
  return {
    ...state,
    theme: action.theme,
  };
}

export function configurationReducer(state: IConfiguration = initialState, action: IConfigureThemeAction | undefined): IConfiguration {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
