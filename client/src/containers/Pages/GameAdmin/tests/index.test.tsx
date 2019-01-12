import { shallow } from 'enzyme';
import * as React from 'react';
import { match } from 'react-router-dom';
import { GameAdmin } from '..';
import { IGameAdminPage } from '../reducer';

it('renders <Create> without crashing', () => {
  const fn = jest.fn();
  const page: IGameAdminPage = {
    data: {},
    game: {
      createdBy: '',
      id: '',
      name: '',
      shareId: '',
    },
    title: '',
  };

  const matchProp: match = {
    isExact: true,
    params: {},
    path: '',
    url: '',
  };

  const renderedComponent = shallow(<GameAdmin match={matchProp} page={page} fetchGame={fn} />);
  expect(!!renderedComponent).toBeDefined();
});