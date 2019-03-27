import { IGameService } from 'infrastructure/games/game.service';
import { IGame } from 'infrastructure/games/game.types';
import { IPlayer, IPlayerInput } from './player.types';

export async function addPlayerToGame(_: any, { input }: { input: IPlayerInput }, { gameService }: { gameService?: IGameService }) {
  let game = await gameService.getById(input.gameId);

  input.archived = false;
  game.players.push(input);
  game = await gameService.updateGame(game.id, game, true, false);

  const player = game.players[game.players.length - 1];

  for (const round of game.rounds) {
    round.scores.push({ playerId: player.id, points: 0 })
  }

  await gameService.updateGame(game.id, game);

  return game;
}

export async function deletePlayer(_: any, { id, gameId }: { id: any, gameId: any }, { gameService }: { gameService?: IGameService }) {
  const game = await gameService.getById(gameId);

  const player = game.players.find(p => p.id.toString() === id);
  if (player) {
    player.archived = true;
    await gameService.updateGame(game.id, game);
  }
  return game;
}

export async function updatePlayer(_, { id, input }: { id: any, gameId: any, input: IPlayerInput }, { gameService }: { gameService?: IGameService }) {
  const game = await gameService.getById(input.gameId);

  const player = game.players.find(p => p.id === id);
  if (player) {
    player.name = input.name;
    await gameService.updateGame(game.id, game);
  }
  return game;
}

export async function totalScore(player: IPlayer, args: any, { gameService }: { gameService?: IGameService }) {
  const game = await gameService.getByPlayerId(player.id);

  let totalScoreForPlayer = 0;
  game.rounds.map(round => {
    const score = round.scores.find(x => x.playerId.toString() === player.id.toString());
    if (score) {
      totalScoreForPlayer += score.points;
    }
  });
  return totalScoreForPlayer;
}

export async function findGameForPlayer(player: IPlayer, _: any, { gameService }: { gameService?: IGameService }): Promise<IGame> {
  return await gameService.getByPlayerId(player.id);
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
