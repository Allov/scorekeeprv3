import { shallow } from 'enzyme';
import * as React from 'react';
import { Notifications } from '..';

it('renders <Notifications> without crashing', () => {
  const renderedComponent = shallow(<Notifications notifications={[]} />);
  expect(!!renderedComponent).toBe(true);
})
