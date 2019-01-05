import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

import { themePicker } from './lib/styled/interface';


const store = configureStore({
  configuration: {
    theme: 'night',
  },
  modal: {},
  pages: [],
});

ReactDOM.render(
  <Provider store={store}>
    <App myTheme={themePicker[store.getState().configuration.theme]} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
