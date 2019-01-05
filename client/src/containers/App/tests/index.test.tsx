import { ConnectedRouter } from 'connected-react-router';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { App } from '..';

it('renders <App /> container without crashing', () => {
  const mockHistory = createMemoryHistory();
  const renderedComponent = shallow(<App history={mockHistory} theme="DEFAULT" />);
  expect(renderedComponent.find(ConnectedRouter).length).toEqual(1);
});
