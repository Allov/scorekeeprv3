import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { fetchHelloworld } from './actions';
import './index.css';
import { game } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas';
import StyledApp from './StyledApp';

// https://github.com/jaysoo/todomvc-redux-react-typescript/issues/8#issuecomment-246183386
// todo: disable when in prod
const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f : any) => f;

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);
const store = middlewares(devtools(createStore))(game, {});

sagaMiddleware.run(rootSaga);

store.dispatch(fetchHelloworld())

ReactDOM.render(
  <Provider store={store}>
    <StyledApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
