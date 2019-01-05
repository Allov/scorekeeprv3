import { shallow } from 'enzyme';
import * as React from 'react';
import Layout from '..';

it('renders a <Layout> tag without crashing', () => {
  const renderedComponent = shallow(<Layout><div>don't care</div></Layout>)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
