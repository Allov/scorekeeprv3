
import { shallow } from 'enzyme';
import * as React from 'react';
import Button from '..';

it('renders a <button> tag without crashing', () => {
  const renderedComponent = shallow(<Button />)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
