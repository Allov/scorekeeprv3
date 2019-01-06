import { shallow } from 'enzyme';
import * as React from 'react';
import Layout from '..';

let theme: string;
theme = 'party';

it('renders a <Layout> tag without crashing', () => {
  const renderedComponent = shallow(<Layout theme={theme}><div>don't care</div></Layout>)
  expect(renderedComponent.find('StyledComponent').length).toEqual(1);
});
