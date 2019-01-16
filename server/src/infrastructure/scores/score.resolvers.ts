import { IPlayer } from 'infrastructure/players/player.types';
import { Types } from 'mongoose';
import { Game as GameRepository } from '../games/game.model';
import { IScore, IScoreFilterInput, IScoresInput } from './score.types';

export async function addScoresToRound(_: any, { input }: { input: IScoresInput }) {

  let game = await GameRepository.findById(input.filter.gameId);
  if (!game) {
    return null;
  }
  const roundIndex = game.rounds.findIndex(x => x.id === input.filter.roundId);
  if (roundIndex > -1) {
    game.rounds[roundIndex].scores = game.rounds[roundIndex].scores.concat(input.scores);
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }
  return game;
}

export async function deleteScore(_: any, { id, filter }: { id: any, filter: IScoreFilterInput }) {
  let game = await GameRepository.findById(filter.gameId);
  if (!game) {
    return null;
  }

  const roundIndex = game.rounds.findIndex(x => x.id === filter.roundId);
  if (roundIndex > -1) {
    const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x.id === id);
    if (scoreIndex > -1) {
      game.rounds[roundIndex].scores = game.rounds[roundIndex].scores.splice(scoreIndex, 1);
      game = await GameRepository.findByIdAndUpdate(game.id, game);
    }
  }
  return game;
}

export async function updateScore(_: any, { id, input }: { id: any, input: IScoresInput }) {
  let game = await GameRepository.findById(input.filter.gameId);
  if (!game) {
    return null;
  }
  const roundIndex = game.rounds.findIndex(x => x.id === input.filter.roundId);
  if (roundIndex > -1) {
    const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x.id === id);
    if (scoreIndex > -1) {
      game.rounds[roundIndex].scores[scoreIndex] = input.scores[0];
      game = await GameRepository.findByIdAndUpdate(game.id, game);
    }
  }
  return game;
}

export async function player(score: IScore) {
  const playerId = new Types.ObjectId(score.playerId);
  const game = await GameRepository.findOne({'players._id': playerId});
  return game.players.find(p => p.id.toString() === score.playerId);
}

export const scoreResolvers = {
  Mutation: {
    addScoresToRound,
    deleteScore,
    updateScore,
  },
  Score: {
    player,
  },
};
