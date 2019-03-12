import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, { history } from './store';

const store = configureStore({
  configuration: {
    theme: 'day',
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App history={history} theme={'day'} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
