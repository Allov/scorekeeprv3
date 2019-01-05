import { IConfiguration } from '../../types';
import { IConfigureTheme } from './actions';
import { CONFIGURE_THEME } from './constants';

const initialState: IConfiguration = {
  theme: 'DEFAULT',
};

const actions: CONFIGURE_THEME[] = [];
actions[CONFIGURE_THEME] = (state: IConfiguration, action: IConfigureTheme) => {
  return {
    ...state,
    theme: action.theme,
  };
}

export function appReducer(state: IConfiguration = initialState, action: IConfigureTheme | undefined): IConfiguration {
  if (!action || !actions[action.type]) { return state; }
  return actions[action.type](state, action);
}
