import DataLoader from 'dataloader';
import { IGamesLoader } from 'infrastructure/games/game.loader';
import { IGameService } from 'infrastructure/games/game.service';
import { IUser } from 'infrastructure/users/user.types';

export interface IContext {
  gameService: IGameService;
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
