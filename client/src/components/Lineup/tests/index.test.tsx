import { shallow } from 'enzyme';
import * as React from 'react';
import Lineup from '..';

it('renders a <Lineup> tag without crashing', () => {
  const renderedComponent = shallow(<Lineup><li>don't care</li></Lineup>)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
