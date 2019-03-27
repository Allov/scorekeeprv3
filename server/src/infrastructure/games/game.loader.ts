import DataLoader from 'dataloader';
import { Types } from 'mongoose';
import { IContext } from 'types/graphql';
import { Game as GameService } from './game.model';
import { IGame } from './game.types';

//Use GameRepository
type BatchGamesByIds = (ids: string[]) => Promise<IGame[]>;

const batchGamesByIds: BatchGamesByIds = async (ids) => {
  const objectIds = ids.map(id => new Types.ObjectId(id));
  const games = await GameService.find({
    '_id': { $in: objectIds }
  });

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.id] = game;
  });

  return ids.map(id => gameMap[id]);
};

type BatchGamesByShareId = (shareIds: string[]) => Promise<IGame[]>;

const batchGamesByShareIds: BatchGamesByShareId = async (shareIds) => {
  const games = await GameService.find({
    'shareId': { $in: shareIds }
  });

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.shareId] = game;
  });

  return shareIds.map(id => gameMap[id]);
}

type BatchGamesByPlayerId = (playerIds: string[]) => Promise<IGame[]>;

const batchGamesByPlayerIds: BatchGamesByPlayerId = async (playerIds) => {
  const objectIds = playerIds.map(id => new Types.ObjectId(id));
  const games = await GameService.find({
    'players._id': { $in: objectIds }
  });

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    game.players.forEach(player => {
      gameMap[player.id] = game;
    });
  });

  return playerIds.map(id => gameMap[id]);
}

type BatchGamesByRoundId = (roundIds: string[]) => Promise<IGame[]>;

const batchGamesByRoundIds: BatchGamesByRoundId = async (roundIds) => {
  const objectIds = roundIds.map(id => new Types.ObjectId(id));
  const games = await GameService.find({
    'rounds._id': { $in: objectIds }
  });

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    game.rounds.forEach(round => {
      gameMap[round.id] = game;
    });
  });

  return roundIds.map(id => gameMap[id]);
}

// inspired by: https://github.com/facebook/dataloader#loading-by-alternative-keys
// humm. How to prevent all this code. Priming seems good ... but there must be a better way to batch prime.
export const gamesByIdsLoader = (context: IContext) => new DataLoader<string, IGame>(async (ids) => {
  const games = await batchGamesByIds(ids);

  context.gameService.prime(games);

  return games;
});

export const gamesByShareIdsLoader = (context: IContext) => new DataLoader<string, IGame>(async (shareIds) => {
  const games = await batchGamesByShareIds(shareIds);

  context.gameService.prime(games);

  return games;
});

export const gamesByPlayerIdsLoader = (context: IContext) =>  new DataLoader<string, IGame>(async (playerIds) => {
  const games = await batchGamesByPlayerIds(playerIds);

  context.gameService.prime(games);

  return games;
});

export const gamesByRoundIdsLoader = (context: IContext) => new DataLoader<string, IGame>(async (roundsIds) => {
  const games = await batchGamesByRoundIds(roundsIds);

  context.gameService.prime(games);

  return games;
});

export interface IGamesLoader {
  byId: DataLoader<string, IGame>;
  byPlayerId: DataLoader<string, IGame>;
  byRoundId: DataLoader<string, IGame>;
  byShareId: DataLoader<string, IGame>;
}
