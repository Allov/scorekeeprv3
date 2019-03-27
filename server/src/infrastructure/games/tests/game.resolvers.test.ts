import ScorekeeprContextMock from 'app/tests/context.mock';
import {
  players,
  rounds,
} from '../game.resolvers';
import { mockGames } from './game.loader.mock';

const mockContext = new ScorekeeprContextMock();
const mockGame = mockGames[0];

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
