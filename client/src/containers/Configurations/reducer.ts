import { IConfiguration } from '../../types';
import { IConfigureThemeAction } from './actions';
import { CONFIGURE_THEME } from './constants';

const initialState: IConfiguration = {
  theme: 'day',
};

const actions: Map<CONFIGURE_THEME, (state: IConfiguration, action: IConfigureThemeAction) => IConfiguration> = new Map();

actions.set(CONFIGURE_THEME, (state: IConfiguration, action: IConfigureThemeAction) => {
  return {
    ...state,
    theme: action.theme,
  };
});

export function configurationReducer(state: IConfiguration = initialState, action: IConfigureThemeAction | undefined): IConfiguration {
  if (!action || !actions.get(action.type)) { return state; }
  return actions.get(action.type)!(state, action);
}
