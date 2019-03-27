import { IGameService } from 'infrastructure/games/game.service';
import { IRound, IRoundInput } from './round.types';

export async function addRoundToGame(_: any, { input }: { input: IRoundInput }, { gameService }: { gameService?: IGameService }) {
  let game = await gameService.getById(input.gameId);
  if (!game) {
    return null;
  }
  input.roundNumber = game.rounds.length + 1;
  input.scores = [];
  game.rounds.push(input);
  game = await gameService.updateGame(game.id, game);
  return game;
}

export async function deleteRound(_: any, { id, gameId }: { id: any, gameId: any }, { gameService }: { gameService?: IGameService }) {
  let game = await gameService.getById(gameId);
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
    game = await gameService.updateGame(game.id, game);
  }

  return game;
}

export async function updateRound(_: any, { id, input }: { id: any, input: IRoundInput }, { gameService }: { gameService?: IGameService }) {
  let game = await gameService.getById(input.gameId);
  if (!game) {
    return null;
  }
  const foundIndex = game.rounds.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    const round = game.rounds[foundIndex];
    round.scores = input.scores;
    game.rounds[foundIndex] = round;
    game = await gameService.updateGame(game.id, game);
  }
  return game;
}

export async function scores(round: IRound, _: any, { gameService }: { gameService?: IGameService }) {
  const game = await gameService.getByRoundId(round.id);
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
