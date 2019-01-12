import { shallow } from 'enzyme';
import * as React from 'react';
import Input from '..';

it('renders <Input> without crashing', () => {
  const renderedComponent = shallow(<Input />);
  expect(!!renderedComponent).toBeDefined();
});
