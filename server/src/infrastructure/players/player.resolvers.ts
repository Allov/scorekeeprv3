import { IGameRepository } from 'infrastructure/games/game.repository';
import { IGame } from 'infrastructure/games/game.types';
import { IPlayer, IPlayerInput } from './player.types';

export async function addPlayerToGame(_: any, { input }: { input: IPlayerInput }, { gameRepository }: { gameRepository?: IGameRepository }) {
  let game = await gameRepository.getById(input.gameId);

  input.archived = false;
  game.players.push(input);
  game = await gameRepository.updateGame(game.id, game, true);

  const player = game.players[game.players.length - 1];

  for (const round of game.rounds) {
    round.scores.push({ playerId: player.id, points: 0 })
  }

  game = await gameRepository.updateGame(game.id, game, { new: true });

  return game;
}

export async function deletePlayer(_: any, { id, gameId }: { id: any, gameId: any }, { gameRepository }: { gameRepository?: IGameRepository }) {
  const game = await gameRepository.getById(gameId);

  const player = game.players.find(p => p.id.toString() === id);
  if (player) {
    player.archived = true;
    await gameRepository.updateGame(game.id, game, false);
  }
  return game;
}

export async function updatePlayer(_, { id, input }: { id: any, gameId: any, input: IPlayerInput }, { gameRepository }: { gameRepository?: IGameRepository }) {
  const game = await gameRepository.getById(input.gameId);

  const player = game.players.find(p => p.id === id);
  if (player) {
    player.name = input.name;
    await gameRepository.updateGame(game.id, game, false);
  }
  return game;
}

export async function totalScore(player: IPlayer, args: any, { gameRepository }: { gameRepository?: IGameRepository }) {
  const game = await gameRepository.getByPlayerId(player.id);

  let totalScoreForPlayer = 0;
  game.rounds.map(round => {
    const score = round.scores.find(x => x.playerId.toString() === player.id.toString());
    if (score) {
      totalScoreForPlayer += score.points;
    }
  })
  return totalScoreForPlayer;
}

export async function findGameForPlayer(player: IPlayer, _: any, { gameRepository }: { gameRepository?: IGameRepository }): Promise<IGame> {
  return await gameRepository.getByPlayerId(player.id);
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
