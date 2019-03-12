import { IGameRepository } from 'infrastructure/games/game.repository';
import { IRound, IRoundInput } from './round.types';

export async function addRoundToGame(_: any, { input }: { input: IRoundInput }, { gameRepository }: { gameRepository?: IGameRepository }) {
  let game = await gameRepository.getById(input.gameId);
  if (!game) {
    return null;
  }
  input.roundNumber = game.rounds.length + 1;
  input.scores = [];
  game.rounds.push(input);
  game = await gameRepository.updateGame(game.id, game);
  return game;
}

export async function deleteRound(_: any, { id, gameId }: { id: any, gameId: any }, { gameRepository }: { gameRepository?: IGameRepository }) {
  let game = await gameRepository.getById(gameId);
  if (!game) {
    return null;
  }
  const foundIndex = game.rounds.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    game.rounds.forEach((round, index, array) => {
      if (index > foundIndex) {
        array[index].roundNumber--;
      }
    });
    game.rounds.splice(foundIndex, 1);
    game = await gameRepository.updateGame(game.id, game);
  }

  return game;
}

export async function updateRound(_: any, { id, input }: { id: any, input: IRoundInput }, { gameRepository }: { gameRepository?: IGameRepository }) {
  let game = await gameRepository.getById(input.gameId);
  if (!game) {
    return null;
  }
  const foundIndex = game.rounds.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    const round = game.rounds[foundIndex];
    round.scores = input.scores;
    game.rounds[foundIndex] = round;
    game = await gameRepository.updateGame(game.id, game);
  }
  return game;
}

export async function scores(round: IRound, _: any, { gameRepository }: { gameRepository?: IGameRepository }) {
  const game = await gameRepository.getByRoundId(round.id);
  return round.scores.filter(score => !game.players.find(player => player.id === score.playerId).archived);
}

export const roundResolvers = {
  Mutation: {
    addRoundToGame,
    deleteRound,
    updateRound,
  },
  Round: {
    scores,
  }
};
