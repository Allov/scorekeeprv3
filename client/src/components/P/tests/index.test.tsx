
import { shallow } from 'enzyme';
import * as React from 'react';
import P from '..';

it('renders a <p> tag without crashing', () => {
  const renderedComponent = shallow(<P />)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
