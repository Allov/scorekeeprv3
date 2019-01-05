import { shallow } from 'enzyme';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '..';

it('renders <App /> container without crashing', () => {
  const renderedComponent = shallow(<App theme="DEFAULT" />);
  expect(renderedComponent.find(Router).length).toEqual(1);
});
