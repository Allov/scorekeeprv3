import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from './containers/App/sagas';
import createReducer from './reducers';
import { IStore } from './types';

export const history = createBrowserHistory();

export default function configureStore(initialState: IStore) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // https://github.com/jaysoo/todomvc-redux-react-typescript/issues/8#issuecomment-246183386
  // todo: disable when in prod
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
      compose;

  const store = createStore(createReducer(history), initialState, composeEnhancers(...enhancers));

  // sagaMiddleware.run(rootSaga);

  return store;
}

