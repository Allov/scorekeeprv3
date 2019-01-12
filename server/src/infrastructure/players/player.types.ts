import { IGame } from 'infrastructure/games/game.types';
import { IUser } from 'infrastructure/users/user.types';

export interface IPlayer {
  archived: boolean;
  id?: any;
  name: string;
  game: IGame;
  scores: any[];
  user: IUser;
}
