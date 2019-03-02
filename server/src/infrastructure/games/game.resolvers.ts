import DataLoader from 'dataloader';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { IPlayer } from 'infrastructure/players/player.types';
import { IRound } from 'infrastructure/rounds/round.types';
import { IUser } from 'infrastructure/users/user.types';
import sillyname from 'sillyname';
import { IResolverMap } from 'types/graphql';
import { User as UserRepository } from '../users/user.model';
import { IGamesLoader } from './game.loader';
import { Game } from './game.model';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export async function createdBy(game: IGame, _, { userLoader }: { userLoader: DataLoader<string, IUser> }) {
  return await userLoader.load(game.createdBy);
}

export async function players(game: IGame) {
  return game.players.filter((player: IPlayer) => !player.archived);
}

export async function createGame(_: any, { input }: { input: IGameInput }) {
  let user: IUser;
  if (input.userId) {
    user = await UserRepository.findById(input.userId);
  } else {
    user = await UserRepository.create({ username: `${sillyname()}`.replace(/ /g, '-') });
  }

  input.createdAt = Date.now();
  input.shareId = `${sillyname()}${sillyname()}`.replace(/ /g, '-').toLowerCase();
  input.createdBy = user.id;
  input.rounds = [{
    roundNumber: 1,
    scores: [],
  }];

  const game = await Game.create(input);
  user.games = [game.id];
  user = await UserRepository.findByIdAndUpdate(user.id, user);
  return game;
}

export async function deleteGame(_: any, { id }: { id: any }) {
  return await Game.findByIdAndRemove(id);
}
// TODO: Support PubSub
export async function editGame(_: any, { id, input }: { id: any, input: IGameInput }) {
  return await Game.findByIdAndUpdate(id, input);
}

export async function gamebyId(_: any, { id }: { id: any }, { gamesLoader }: { gamesLoader?: IGamesLoader }) : Promise<IGame> {
  return await gamesLoader.byId.load(id);
}

export async function gameByShareId(_: any, { shareId }: { shareId: string }, { gamesLoader }: { gamesLoader?: IGamesLoader }) : Promise<IGame> {
  return await gamesLoader.byShareId.load(shareId);
}

// TODO: Define return type. Return IGame[] and not IGameModel[]
export async function games(_: any, { filter }: { filter: IGameFilterInput }){
  return await Game.find({}, null, filter);
}

export function rounds(game: IGame, { roundNumber }: { roundNumber: number | undefined }) : IRound[] {
  return roundNumber ? game.rounds.filter(round => round.roundNumber === roundNumber) : game.rounds;
}

export function gameUpdated(_: any, { shareId }: { shareId: string }, { gamesLoader }: { gamesLoader?: IGamesLoader }) : IGame {
  return null;
}

const pubsub = new PubSub();

export const gameResolvers: IResolverMap = {
  Game: {
    createdBy,
    players,
    rounds,
  },
  Mutation: {
    createGame,
    deleteGame,
    editGame,
  },
  Query: {
    game: gamebyId,
    gameByShareId,
    games,
  },
  Subscription: {
    gameUpdated,
  }
};
