
import { shallow } from 'enzyme';
import * as React from 'react';
import { FrontCard } from '..';

it('renders a <FrontCard> tag without crashing', () => {
  const renderedComponent = shallow(<FrontCard title="dont-care" link="https://dont-care" />)
  expect(renderedComponent.find('li').length).toEqual(1);
});
