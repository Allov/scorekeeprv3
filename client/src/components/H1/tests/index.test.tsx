import { shallow } from 'enzyme';
import * as React from 'react';
import H1 from '..';

it('renders a <h1> tag without crashing', () => {
  const renderedComponent = shallow(<H1 />)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
