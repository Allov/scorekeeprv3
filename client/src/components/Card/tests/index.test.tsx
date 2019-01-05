
import { shallow } from 'enzyme';
import * as React from 'react';
import StyledCard, { Card } from '..';

it('renders a <StyledCard> tag without crashing', () => {
  const renderedComponent = shallow(<StyledCard title="dont-care" link="https://dont-care" />)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});

it('renders a <Card> tag without crashing', () => {
  const renderedComponent = shallow(<Card title="dont-care" link="https://dont-care" />)
  expect(renderedComponent.find('li').length).toEqual(1);
});
