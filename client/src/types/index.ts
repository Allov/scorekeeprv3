import { RouterState } from 'connected-react-router';
import { IGameAdminPage } from '../containers/Pages/GameAdmin/reducer';
import { Notifications } from './constants';

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
  userId?: string;
}

export interface IGame {
  id: string;
  name: string;
  shareId: string;
  createdBy: string;
}

export interface IUser {
  username: string;
}

// mm
export interface IPages {
  gameAdmin: IGameAdminPage;
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
