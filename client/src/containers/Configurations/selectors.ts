import { createSelector } from 'reselect';
import { IConfiguration, IStore } from '../../types';

const getConfigurationState = (state: IStore) => state.configuration;

export const makeSelectTheme = () => createSelector<IStore, IConfiguration | undefined, string>(
  getConfigurationState,
  (state: IConfiguration) => {
    return state.theme;
  },
);
