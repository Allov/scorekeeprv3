import { IGamesLoader } from 'infrastructure/games/game.loader';
import { Types } from 'mongoose';
import { Game as GameRepository } from '../games/game.model';
import { IPlayer, IPlayerInput } from './player.types';

export async function addPlayerToGame(_: any, { input }: { input: IPlayerInput }, { gamesLoader }: { gamesLoader: IGamesLoader }) {
  const game = await gamesLoader.byId.load(input.gameId);
  gamesLoader.resetCache(game);

  input.archived = false;
  game.players.push(input);
  await GameRepository.findByIdAndUpdate(game.id, game, { new: true });

  const player = game.players[game.players.length - 1];

  for(const round of game.rounds) {
    round.scores.push({ playerId: player.id, points: 0 })
  }

  await GameRepository.findByIdAndUpdate(game.id, game, { new: true });

  return game;
}

export async function deletePlayer(_: any, { id, gameId }: { id: any, gameId: any }, { gamesLoader }: { gamesLoader: IGamesLoader }) {
  const game = await gamesLoader.byId.load(gameId);
  gamesLoader.resetCache(game);

  const player = game.players.find(p => p.id.toString() === id);
  if (player) {
    player.archived = true;
    await GameRepository.findByIdAndUpdate(game.id, game);
  }

  return game;
}

export async function updatePlayer(_, { id, input }: { id: any, gameId: any, input: IPlayerInput }, { gamesLoader }: { gamesLoader: IGamesLoader }) {
  const game = await gamesLoader.byId.load(input.gameId);
  gamesLoader.resetCache(game)

  const player = game.players.find(p => p.id === id);
  if (player) {
    player.name = input.name;
    await GameRepository.findByIdAndUpdate(game.id, game);
  }

  return game;
}

export async function totalScore(player: IPlayer, args: any, { gamesLoader }: { gamesLoader: IGamesLoader }) {
  const game = await gamesLoader.byPlayerId.load(player.id);

  let totalScoreForPlayer = 0;
  game.rounds.map(round => {
    const score = round.scores.find(x => x.playerId.toString() === player.id.toString());
    if (score) {
      totalScoreForPlayer += score.points;
    }
  })
  return totalScoreForPlayer;
}

export async function findGameForPlayer(player: IPlayer) {
  return await GameRepository.findOne({ 'players._id': new Types.ObjectId(player.id) });
}

export const playerResolvers = {
  Mutation: {
    addPlayerToGame,
    deletePlayer,
    updatePlayer,
  },
  Player: {
    game: findGameForPlayer,
    totalScore,
  }
};
