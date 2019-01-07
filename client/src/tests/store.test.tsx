import { compose } from 'redux';
import configureStore from '../store';

it('should configure the redux store correctly', () => {
  const store = configureStore({});
  expect(store.getState()).toMatchSnapshot();
});

it('should configure the redux store correctly with developer tool', () => {
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = compose;

  const store = configureStore({});
  expect(store.getState()).toMatchSnapshot();
});
