import { shallow } from 'enzyme';
import * as React from 'react';
import EditablePlayer from '..';

it('renders a <EditablePlayer> tag without crashing', () => {
  const renderedComponent = shallow(<EditablePlayer name="dont-care" points={0} totalScore={0} />)
  expect(!!renderedComponent).toBeDefined();
});
