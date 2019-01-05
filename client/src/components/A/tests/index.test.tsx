import { shallow } from 'enzyme';
import * as React from 'react';
import A from '..';

it('should render an <a> tag without crashing', () => {
  const renderedApp = shallow(<A to="https://dont-care.com" />);
  expect(renderedApp.find('StyledComponent').length).toEqual(1);
});
