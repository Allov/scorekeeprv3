export interface IUser {
  id: string,
  name: string,
}

export interface IGame {
  shareId: string,
  name: string,
}

export interface IStore {
    me?: IUser,
    game?: IGame,
}
