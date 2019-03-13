import { IPlayer } from 'infrastructure/players/player.types';
import { IRound } from 'infrastructure/rounds/round.types';

export interface IGame {
  id?: any;
  name: string;
  shareId: string;
  rounds: IRound[];
  players: IPlayer[];
  createdBy: string;
}

export interface IGameInput {
  name: string;
  userId: string;
  createdBy: any;
  rounds: IRound[];
  shareId: string;
  createdAt: number;
}

export interface IGameFilterInput {
  limit: number;
}
