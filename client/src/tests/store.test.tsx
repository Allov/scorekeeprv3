import { compose } from 'redux';
import { IStore } from 'src/types';
import configureStore from '../store';

it('should configure the redux store correctly', () => {
  const state: IStore = {
    configuration: {
      theme: 'DEFAULT',
    },
    router: {
      action: 'POP',
      location: {
        hash: '',
        pathname: '/',
        search: '',
        state: null,
      },
    },
  };

  const store = configureStore(state);
  expect(store.getState()).toEqual(state);
});

it('should configure the redux store correctly with developer tool', () => {
  const state: IStore = {
    configuration: {
      theme: 'DEFAULT',
    },
    router: {
      action: 'POP',
      location: {
        hash: '',
        pathname: '/',
        search: '',
        state: null,
      },
    },
  };

  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose;

  const store = configureStore(state);
  expect(store.getState()).toEqual(state);
});
