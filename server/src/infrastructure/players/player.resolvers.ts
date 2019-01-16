import { Types } from 'mongoose';
import { Game as GameRepository } from '../games/game.model';
import { IPlayer, IPlayerInput } from './player.types';

export async function addPlayerToGame(_: any, { input }: { input: IPlayerInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  input.archived = false;
  game.players.push(input);
  game = await GameRepository.findByIdAndUpdate(game.id, game, { new: true });
  const player = game.players[game.players.length - 1];

  game.rounds.forEach((element, index, array) => {
    game.rounds[index].scores.push({ playerId: player.id, points: 0 });
  });
  game = await GameRepository.findByIdAndUpdate(game.id, game, { new: true });
  return game.players[game.players.length - 1];
}

export async function deletePlayer(_: any, { id, gameId }: { id: any, gameId: any }) {
  let game = await GameRepository.findById(gameId);
  if (!game) {
    return null;
  }

  const foundIndex = game.rounds.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    game.players[foundIndex].archived = true;
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }
  return game;
}

export async function updatePlayer(_, { id, input }: { id: any, gameId: any, input: IPlayerInput }) {
  let game = await GameRepository.findById(input.gameId);
  if (!game) {
    return null;
  }
  const foundIndex = game.players.findIndex(x => x.id === id);
  if (foundIndex > -1) {
    const player = game.players[foundIndex];
    player.name = input.name;
    game.players[foundIndex] = player;
    game = await GameRepository.findByIdAndUpdate(game.id, game);
  }
  return game;
}


export async function totalScore(player: IPlayer) {
  const game = await GameRepository.findOne({ 'players._id': new Types.ObjectId(player.id) });
  let totalScoreForPlayer = 0;
  game.rounds.map(round => {
    const score = round.scores.find(x => x.playerId.toString() === player.id.toString());
    if (score) {
      totalScoreForPlayer += score.points;
    }
  })
  return totalScoreForPlayer;
}

export const playerResolvers = {
  Mutation: {
    addPlayerToGame,
    deletePlayer,
    updatePlayer,
  },
  Player: {
    totalScore
  }
};
