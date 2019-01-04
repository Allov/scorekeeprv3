import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StyledApp from './components/StyledApp';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <StyledApp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
