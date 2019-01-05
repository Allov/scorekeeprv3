
import { shallow } from 'enzyme';
import * as React from 'react';
import Home from '..';
import Card from '../../../components/Card';

it('renders <Home /> container without crashing', () => {
  const renderedComponent = shallow(<Home />);
  expect(renderedComponent.find(Card).length).toBeGreaterThanOrEqual(1);
});
