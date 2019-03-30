import DataLoader from 'dataloader';
import { withFilter } from 'graphql-subscriptions';
import { IPlayer } from 'infrastructure/players/player.types';
import { IRound } from 'infrastructure/rounds/round.types';
import { IUser } from 'infrastructure/users/user.types';
import sillyname from 'sillyname';
import eventListener, { Events } from '../../app/eventListener';
import { User as UserRepository } from '../users/user.model';
import { Game, IGameModel } from './game.model';
import { IGameService } from './game.service';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export async function createdBy(game: IGame, _, { userLoader }: { userLoader: DataLoader<string, IUser> }) {
  return await userLoader.load(game.createdBy);
}

export function players(game: IGame) : IPlayer[] {
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

export async function deleteGame(_: any, { id }: { id: any }, { gameService }: { gameService?: IGameService }) {
  return await gameService.deleteGame(id);
}

export async function editGame(_: any, { id, input }: { id: any, input: IGameInput }, { gameService }: { gameService?: IGameService }): Promise<IGameModel> {
  return await gameService.updateGame(id, input);
}

export async function gamebyId(_: any, { id }: { id: any }, { gameService }: { gameService?: IGameService }): Promise<IGame> {
  return await gameService.getById(id);
}

export async function gameByShareId(_: any, { shareId }: { shareId: string }, { gameService }: { gameService?: IGameService }): Promise<IGame> {
  return await gameService.getByShareId(shareId);
}

export async function games(_: any, { filter }: { filter: IGameFilterInput }, { gameService }: { gameService?: IGameService }): Promise<IGame[]> {
  return await gameService.getAll(filter);
}

export function rounds(game: IGame, { roundNumber }: { roundNumber: number | undefined }): IRound[] {
  return roundNumber ? game.rounds.filter(round => round.roundNumber === roundNumber) : game.rounds;
}

export function resolveGameUpdated(payload: any, variables: any, { gameService }: { gameService: IGameService }) {
  gameService.clearAll();
  return payload.gameUpdated;
}


export const subscribeGameUpdate = withFilter(
  () => {
    return eventListener.asyncIterator(Events.GameUpdated)
  },
  (payload, variables) => {
    return payload.shareId === variables.shareId;
  }
)

export const gameResolvers = {
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
    gameUpdated: {
      resolve: resolveGameUpdated,
      subscribe: subscribeGameUpdate,
    },
  }
};
