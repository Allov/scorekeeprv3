import { Game as GameRepository } from '../games/game.model';
import { IRoundInput } from './round.types';

export async function addRoundToGame(_: any, { input }: { input: IRoundInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  input.roundNumber = game.rounds.length + 1;
  input.scores = [];
  game.rounds.push(input);
  game = await GameRepository.findByIdAndUpdate(game.id, game);
  return game;
}

export async function deleteRound(_: any, { id, gameId }: { id: any, gameId: any }) {
  let game = await GameRepository.findById(gameId);
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
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }

  return game;
}

export async function updateRound(_: any, { id, input }: { id: any, input: IRoundInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  const foundIndex = game.rounds.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    const round = game.rounds[foundIndex];
    round.scores = input.scores;
    game.rounds[foundIndex] = round;
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }
  return game;
}

export const roundResolvers = {
  Mutation: {
    addRoundToGame,
    deleteRound,
    updateRound,
  },
};
