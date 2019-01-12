import { IGame } from 'infrastructure/games/game.types';

export interface IUser {
  id?: any;
  username: string;
  games?: IGame[];
}
