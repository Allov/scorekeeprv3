import { RouterState } from 'connected-react-router';

// todo: split this... probably.

// state types
export interface IStore {
  configuration?: IConfiguration;
  modal?: any;
  pages?: IPage[];
  router?: RouterState;
}

export interface IConfiguration {
  theme: string;
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
