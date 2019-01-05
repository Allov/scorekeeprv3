import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StyledApp from './components/StyledApp';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

const store = configureStore({});

import { themePicker } from './lib/styled/interface';

let theme: string;
theme = 'party';

ReactDOM.render(
  <Provider store={store}>
    <StyledApp myTheme={themePicker[theme]} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
