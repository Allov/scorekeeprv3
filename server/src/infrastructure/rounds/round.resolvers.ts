import { IGamesLoader } from 'infrastructure/games/game.loader';
import { Game as GameRepository } from '../games/game.model';
import { IRound, IRoundInput } from './round.types';

// TODO: Support PubSub
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

// TODO: Support PubSub
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

// TODO: Support PubSub
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

export async function scores(round: IRound, args: any, { gamesLoader }: { gamesLoader?: IGamesLoader }) {
  const game = await gamesLoader.byRoundId.load(round.id);
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
