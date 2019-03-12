import { createSelector, Selector } from 'reselect';
import { IConfiguration, IStore } from '../../types';

const getConfigurationState: Selector<IStore, IConfiguration | undefined> = (state: IStore) => state.configuration;

export const makeSelectTheme = () => createSelector<IStore, IConfiguration | undefined, string>(
  getConfigurationState,
  (state: IConfiguration | undefined) => {
    return state!.theme;
  }
);
