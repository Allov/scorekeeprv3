import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, StoreCreator } from 'redux';
import App from './App';
import './index.css';
import { game } from './reducers';
import registerServiceWorker from './registerServiceWorker';

// https://github.com/zalmoxisus/redux-devtools-extension/issues/134
// todo: disable when in prod
const enhancer: StoreCreator = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()(createStore) : createStore;
const store = enhancer(game, {
  game: '',
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
