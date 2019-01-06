import { RouterState } from 'connected-react-router';
import { Notifications } from './constants';

// todo: split this... probably.

// state types
export interface IStore {
  configuration?: IConfiguration;
  notifications?: INotification[];
  modal?: any;
  pages?: IPage[];
  router?: RouterState;
}

export interface IConfiguration {
  theme: string;
}

export interface INotification {
  type: Notifications;
  message: string;
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
