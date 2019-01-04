import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './containers/App/sagas';
import { IStore } from './containers/App/types';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState: IStore) {
  const middlewares = [
    sagaMiddleware,
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

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
}

