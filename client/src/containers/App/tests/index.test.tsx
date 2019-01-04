import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '..';

it('renders without crashing', () => {
  const NoRouter = App(null);
  const div = document.createElement('div');
  ReactDOM.render(<NoRouter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
