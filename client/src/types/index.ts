import { RouterState } from 'connected-react-router';
import { IGamePage } from '../containers/Pages/Game/reducer';
import { Notifications } from './constants';
import { ICreateGamePage } from '../containers/Pages/Create/reducer';

// todo: split this... probably.

// state types
export interface IStore {
  configuration?: IConfiguration;
  notifications?: INotification[];
  modal?: any;
  pages?: IPages;
  router?: RouterState;
}

export interface IConfiguration {
  theme: string;
}

export interface INotification {
  type: Notifications;
  message: string;
}

// this needs to be shared between client and backend.
export interface IGameInput {
  name: string;
  numberOfPlayers: number;
  userId?: string;
}

export interface IGame {
  id: string;
  name: string;
  shareId: string;
  createdBy: string;
  rounds?: IRound[];
  players?: IPlayer[];
  currentRound?: number;
}

export interface IRound {
  id: string,
  roundNumber: number;
  scores: IScore[];
}

export interface IScore {
  points: number;
  player: IPlayer;
}

export interface IPlayer {
  id: string;
  name: string;
  totalScore: number;
}

export interface IUser {
  username: string;
}

// mm
export interface IPages {
  createGame: ICreateGamePage;
  game: IGamePage;
}

// presentation types
export interface IPage {
  title: string;
  data: any;
}

export interface ILineup {
  title: string;
  items: ICard;
}

export interface ICard {
  title: string;
  description?: string; // todo: html
  link: string;
}

export interface IIndexedAction {
  index: number;
}
