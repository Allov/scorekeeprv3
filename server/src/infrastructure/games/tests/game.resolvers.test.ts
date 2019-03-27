import {
  players,
  rounds,
} from '../game.resolvers';
import { IGame } from '../game.types';

const mockGame: IGame = {
  createdBy: 'fakeUserId',
  id: 'fakeId',
  name: 'fakeName',
  players: [
    {
      archived: false,
      id: 'fakePlayerId1',
      name: 'fakePlayerName1'
    },
    {
      archived: false,
      id: 'fakePlayerId2',
      name: 'fakePlayerName2'
    },
    {
      archived: true,
      id: 'fakePlayerId3',
      name: 'fakePlayerName3'
    }
  ],
  rounds: [
    {
      id: 'fakeRoundId1',
      roundNumber: 1,
      scores: [
        {
          id: 'fakeScore1',
          playerId:'fakePlayerId1',
          points: 3,
        },
        {
          id: 'fakeScore2',
          playerId:'fakePlayerId2',
          points: 6,
        },
      ],
    },
    {
      id: 'fakeRoundId2',
      roundNumber: 2,
      scores: [
        {
          id: 'fakeScore3',
          playerId:'fakePlayerId1',
          points: 4,
        },
        {
          id: 'fakeScore4',
          playerId:'fakePlayerId2',
          points: 7,
        },
      ],
    },
  ],
  shareId: 'fakeShareId',
}


it('should return all rounds', () => {
  const returnRounds = rounds(mockGame, {roundNumber: undefined});
  expect(returnRounds).toEqual(mockGame.rounds);
});

it('should return a specific round', () => {
  const returnRounds = rounds(mockGame, {roundNumber: 2});
  expect(returnRounds).toEqual([mockGame.rounds[1]]);
});

it('should return nothing if roundnumber doesnt exist', () => {
  const returnRounds = rounds(mockGame, {roundNumber: 999});
  expect(returnRounds).toEqual([]);
});

it('should return all unarchived players', () => {
  const returnPlayers = players(mockGame);
  expect(returnPlayers.length).toEqual(2);
})
