import { IPlayer } from 'infrastructure/players/player.types';
import { IUser } from 'infrastructure/users/user.types';

export interface IGame {
  id?: any;
  name: string;
  shareId: string;
  rounds: any[];
  players: IPlayer[];
  createdBy: IUser;
}

export interface IGameInput {
  name: string;
  userId: string;
  createdBy: any;
  rounds: any[];
  shareId: string;
  createdAt: number;
}

export interface IGameFilterInput {
  limit: number;
}
