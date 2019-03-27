import { IGameRepository } from "../game.repository";
import { IGameModel } from '../game.model';

export class MockGameRepository implements IGameRepository {
  gamesLoader: import("../game.loader").IGamesLoader;  eventListener: import("graphql-subscriptions").PubSub;
  games: import("mongoose").Model<IGameModel, {}>;

  getAll(filter: import("../game.types").IGameFilterInput): Promise<import("../game.model").IGameModel[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<import("../game.types").IGame> {
    throw new Error("Method not implemented.");
  }
  getByPlayerId(id: string): Promise<import("../game.types").IGame> {
    throw new Error("Method not implemented.");
  }
  getByRoundId(id: string): Promise<import("../game.types").IGame> {
    throw new Error("Method not implemented.");
  }
  getByShareId(id: string): Promise<import("../game.types").IGame> {
    throw new Error("Method not implemented.");
  }
  createGame(input: import("../game.types").IGameInput): Promise<import("../game.model").IGameModel> {
    throw new Error("Method not implemented.");
  }
  updateGame(id: string, input: any, returnNew?: boolean, publish?: boolean): Promise<import("../game.model").IGameModel> {
    throw new Error("Method not implemented.");
  }
  publishGame(game: import("../game.types").IGame): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteGame(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  prime(games: import("../game.types").IGame[]): void {
    throw new Error("Method not implemented.");
  }
  clearAll(): void {
    throw new Error("Method not implemented.");
  }

}
