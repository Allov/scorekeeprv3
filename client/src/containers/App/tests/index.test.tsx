import { shallow } from 'enzyme';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '..';
import { themePicker } from '../../../lib/styled/interface';

let theme: string;
theme = 'party';

it('renders <App /> container without crashing', () => {
  const renderedComponent = shallow(<App myTheme={themePicker[theme]} />);
  expect(renderedComponent.find(Router).length).toEqual(1);
});
