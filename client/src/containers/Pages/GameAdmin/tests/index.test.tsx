import { shallow } from 'enzyme';
import * as React from 'react';
import { match } from 'react-router-dom';
import { GameAdmin } from '..';
import { IRound } from '../../../../types';
import { IGameAdminPage } from '../reducer';

it('renders <Create> without crashing', () => {
  const id = 'dont-care';
  const fn = jest.fn();
  const round: IRound = {
    id: '',
    roundNumber: 1,
    scores: [],
  }

  const page: IGameAdminPage = {
    data: {},
    game: {
      createdBy: '',
      currentRound: 1,
      id,
      name: '',
      players: [],
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

  const cut = <GameAdmin
    addPlayer={fn}
    currentRound={round}
    fetchGame={fn}
    gameId={id}
    match={matchProp}
    title={page.title}
    deletePlayer={fn}
    dispatch={fn}
    />;

  const renderedComponent = shallow(cut);
  expect(!!renderedComponent).toBeDefined();
});
