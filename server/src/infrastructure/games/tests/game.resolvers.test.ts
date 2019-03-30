import ScorekeeprContextMock from '../../../app/tests/context.mock';
import {
  deleteGame,
  gamebyId,
  gameByShareId,
  players,
  rounds,
} from '../game.resolvers';
import { mockGames } from './game.repository.mock';

const mockContext = new ScorekeeprContextMock();
const mockGame = mockGames[0];

// todo reinit tests
it('should return all rounds', () => {
  const returnRounds = rounds(mockGame, { roundNumber: undefined });
  expect(returnRounds).toEqual(mockGame.rounds);
});

it('should return a specific round', () => {
  const returnRounds = rounds(mockGame, { roundNumber: 2 });
  expect(returnRounds).toEqual([mockGame.rounds[1]]);
});

it('should return nothing if roundnumber doesnt exist', () => {
  const returnRounds = rounds(mockGame, { roundNumber: 999 });
  expect(returnRounds).toEqual([]);
});

it('should return all unarchived players', () => {
  const returnPlayers = players(mockGame);
  expect(returnPlayers.length).toEqual(2);
})

it('should return a game by id', async () => {
  const returnGame = await gamebyId(null, { id: 'fakeIdA' }, mockContext);
  expect(returnGame).toEqual(mockGame);
})

it('should return nothing if game id doesnt exist', async () => {
  const returnGame = await gamebyId(null, { id: 'fakeIdDoesntExist' }, mockContext);
  expect(returnGame).toBeUndefined();
})

it('should return a game by shareId', async () => {
  const returnGame = await gameByShareId(null, { shareId: 'fakeShareIdA' }, mockContext);
  expect(returnGame).toEqual(mockGame);
})

it('should return a nothing if shareId doesnt exist', async () => {
  const returnGame = await gameByShareId(null, { shareId: 'fakeShareIdDoesntExist' }, mockContext);
  expect(returnGame).toBeUndefined();
})

it('should delete the game and return true', async () => {
  const success = await deleteGame(null, { id: 'fakeIdA' }, mockContext);
  expect(success).toBe(true);
  expect(mockGames.length).toEqual(1);
})

// failing because test data is not immutable and previous tests fucks it all up
it('should not delete a game and return false if id doesnt exist', async () => {
  const success = await deleteGame(null, { id: 'fakeIdDoesntExist' }, mockContext);
  expect(success).toBe(false);
  expect(mockGames.length).toEqual(2);
})
