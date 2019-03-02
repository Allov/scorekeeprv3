import { IGamesLoader } from 'infrastructure/games/game.loader';
import { Game as GameRepository } from '../games/game.model';
import { IScore, IScoreFilterInput, IScoresInput } from './score.types';

// TODO: Support PubSub
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

// TODO: Support PubSub
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

// TODO: Support PubSub
export async function updateScores(_: any, { input }: { input: IScoresInput }, { gamesLoader }: { gamesLoader?: IGamesLoader }) {
  // input validation
  const {
    gameId,
    roundId
  } = input.filter;

  const game = await gamesLoader.byId.load(gameId);

  const round = game
    .rounds
    .find(r => r.id === roundId);

  if (round) {
    for (const inputScore of input.scores) {
      const score = round
        .scores
        .find(s => s.playerId === inputScore.playerId);
      score.points = inputScore.points;

      await GameRepository.findByIdAndUpdate(game.id, game);

      return game;
    }
  }
}

export async function player(score: IScore, args: any, { gamesLoader }: { gamesLoader: IGamesLoader }) {
  const game = await gamesLoader.byPlayerId.load(score.playerId);
  return game.players.find(p => p.id.toString() === score.playerId);
}

export const scoreResolvers = {
  Mutation: {
    addScoresToRound,
    deleteScore,
    updateScores,
  },
  Score: {
    player,
  },
};
