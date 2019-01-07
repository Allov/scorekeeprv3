import { shallow } from 'enzyme';
import * as React from 'react';
import { Create } from '..';

it('renders <Create> without crashing', () => {
  const fn = jest.fn();
  const renderedComponent = shallow(<Create createGame={fn} />);
  expect(!!renderedComponent).toBeDefined();
});
