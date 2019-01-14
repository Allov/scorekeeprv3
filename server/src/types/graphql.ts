import DataLoader from 'dataloader';
import { IGame } from '../infrastructure/games/game.types';
import { IUser } from '../infrastructure/users/user.types';

export interface IContext {
  gameLoader: DataLoader<string, IGame>;
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
