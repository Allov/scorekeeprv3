import { IGameService } from '../games/game.service';
import { IScore, IScoreFilterInput, IScoresInput } from './score.types';

export async function addScoresToRound(_: any, { input }: { input: IScoresInput }, { gameService }: { gameService?: IGameService }) {

  let game = await gameService.getById(input.filter.gameId);
  if (!game) {
    return null;
  }
  const roundIndex = game.rounds.findIndex(x => x.id === input.filter.roundId);
  if (roundIndex > -1) {
    game.rounds[roundIndex].scores = game.rounds[roundIndex].scores.concat(input.scores);
    game = await gameService.updateGame(game.id, game);
  }
  return game;
}

export async function deleteScore(_: any, { id, filter }: { id: any, filter: IScoreFilterInput }, { gameService }: { gameService?: IGameService }) {
  let game = await gameService.getById(filter.gameId);
  if (!game) {
    return null;
  }

  const roundIndex = game.rounds.findIndex(x => x.id === filter.roundId);
  if (roundIndex > -1) {
    const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x.id === id);
    if (scoreIndex > -1) {
      game.rounds[roundIndex].scores = game.rounds[roundIndex].scores.splice(scoreIndex, 1);
      game = await gameService.updateGame(game.id, game);
    }
  }
  return game;
}

export async function updateScores(_: any, { input }: { input: IScoresInput }, { gameService }: { gameService?: IGameService }) {
  // input validation
  const {
    gameId,
    roundId
  } = input.filter;

  const game = await gameService.getById(gameId);

  const round = game
    .rounds
    .find(r => r.id === roundId);

  if (round) {
    for (const inputScore of input.scores) {
      const score = round
        .scores
        .find(s => s.playerId === inputScore.playerId);
      score.points = inputScore.points;

      await gameService.updateGame(game.id, game);

      return game;
    }
  }
}

export async function player(score: IScore, _: any, { gameService }: { gameService?: IGameService }) {
  const game = await gameService.getByPlayerId(score.playerId);
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
