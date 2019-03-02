import DataLoader from 'dataloader';
import { IGamesLoader } from 'infrastructure/games/game.loader';
import { GameRepository } from 'infrastructure/games/game.repository';
import { IUser } from 'infrastructure/users/user.types';

export interface IContext {
  gameRepository: GameRepository;
  userLoader: DataLoader<string, IUser>;
}

export type Resolver = (
  parent: any,
  args: any,
  context: IContext,
  info: any
) => any;

export interface IResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
