import { IGame } from 'infrastructure/games/game.types';
import { IUser } from 'infrastructure/users/user.types';

export interface IPlayer {
  archived: boolean;
  id?: any;
  name: string;

}

export interface IPlayerInput {
  name: string;
  userId: any;
  gameId: string;
  archived: boolean;
}
