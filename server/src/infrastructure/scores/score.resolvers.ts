import { Game as GameRepository } from '../games/game.model';
import { IScoresInput } from './score.types';

export async function addScoresToRound(_: any, { input }: { input: IScoresInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  const roundIndex = game.rounds.findIndex(x => x.id === input.roundId);
  if (roundIndex > -1) {
    game.rounds[roundIndex].scores.concat(input.scores);
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }
  return game;
}

export async function deleteScore(_: any, { id, gameId, roundId }: { id: any, gameId: any, roundId: any }) {
  let game = await GameRepository.findById(gameId);
  if (!game) {
    return null;
  }

  const roundIndex = game.rounds.findIndex(x => x.id === roundId);
  if (roundIndex > -1) {
    const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x === id);
    if (scoreIndex > -1) {
      game.rounds[roundIndex].scores.splice(scoreIndex, 1);
      game = await GameRepository.findByIdAndUpdate(game.id, game);
    }
  }
  return game;
}

export async function updateScore(_: any, { id, input }: { id: any, input: IScoresInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  const roundIndex = game.rounds.findIndex(x => x.id === input.roundId);
  if (roundIndex > -1) {
    const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x.id === id);
    if (scoreIndex > -1) {
      game.rounds[roundIndex].scores[scoreIndex] = input.scores[0];
      game = await GameRepository.findByIdAndUpdate(game.id, game);
    }
  }
  return game;
}

export const scoreResolvers = {
  Mutation: {
    addScoresToRound,
    deleteScore,
    updateScore,
  }
};
