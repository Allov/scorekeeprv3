import { Model, Types } from "mongoose";
import { IGameModel } from './game.model';
import { IGame, IGameFilterInput, IGameInput } from "./game.types";

export interface IGameSearchCriteria {
  shareIds?: string[],
  playerIds?: string[],
  roundIds?: string[],
}

export interface IGameRepository {
  getAll(filter: IGameFilterInput): Promise<IGame[]>;
  getById(id: string): Promise<IGame>;
  getByIds(ids: string[]): Promise<IGame[]>;
  search(searchCriteria: IGameSearchCriteria): Promise<IGame[]>;
  create(input: IGameInput): Promise<IGame>;
  update(id: string, input: any, returnNew?: boolean): Promise<IGame>;
  delete(id: string): Promise<boolean>;
}

export class GameMongooseRepository implements IGameRepository {
  private games: Model<IGameModel, {}>;

  constructor(
    games: Model<IGameModel, {}>
  ) {
    this.games = games;
  }

  public async getAll(filter: IGameFilterInput): Promise<IGame[]> {
    return await this.games.find({}, null, filter);
  }

  public async getById(id: string): Promise<IGame> {
    return (await this.getByIds([id])).shift();
  }

  public async getByIds(ids: string[]): Promise<IGame[]> {
    const objectIds = ids.map(id => new Types.ObjectId(id));
    return await this.games.find({
      '_id': { $in: objectIds }
    });
  }

  public async search(searchCriteria: IGameSearchCriteria): Promise<IGame[]> {
    if (!searchCriteria) { return null; }
    if (searchCriteria.shareIds) {
      return await this.games.find({
        'shareId': { $in: searchCriteria.shareIds }
      });
    }
    if (searchCriteria.playerIds) {
      const objectIds = searchCriteria.playerIds.map(id => new Types.ObjectId(id));
      return await this.games.find({
        'players._id': { $in: objectIds }
      });
    }
    if (searchCriteria.roundIds) {
      const objectIds = searchCriteria.roundIds.map(id => new Types.ObjectId(id));
      return await this.games.find({
        'rounds._id': { $in: objectIds }
      });
    }
  }

  public async create(input: IGameInput): Promise<IGame> {
    return await this.games.create(input);
  }

  public async update(id: string, input: any, returnNew?: boolean): Promise<IGame> {
    return await this.games.findByIdAndUpdate(id, input, { new: returnNew });
  }

  public async delete(id: string): Promise<boolean> {
    await this.games.findByIdAndRemove(id);
    return true;
  }
}
